import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { auth } from '../../Firebase/firebase';
import { onAuthStateChanged, User, setPersistence, browserLocalPersistence, inMemoryPersistence } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  emailVerified: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  cookiesAccepted: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, cookiesAccepted }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const configurePersistence = async () => {
      if (cookiesAccepted === "true") {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, inMemoryPersistence);
      }
    };

    configurePersistence();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);

      if (user) {
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setIsAdmin(userData?.role === 'admin');
        }
        setEmailVerified(user.emailVerified);
      } else {
        setIsAdmin(false);
        setEmailVerified(false);
      }
    });

    return unsubscribe;
  }, [cookiesAccepted]);

  const value: AuthContextType = {
    currentUser,
    isAdmin,
    emailVerified,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
