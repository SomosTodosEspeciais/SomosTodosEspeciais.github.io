import React, { useEffect, useState } from 'react';
import './AdminView.css';
import { useAuth } from '../../context/AuthContext/AuthContext'; // Importando o contexto de autenticação
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const AdminView: React.FC = () => {
  const { currentUser } = useAuth(); // Obtendo o usuário atual do contexto de autenticação
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    if (currentUser) {
      const db = getFirestore();
      const fetchUserData = async () => {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userDataFromFirestore = userDoc.data();
            if (userDataFromFirestore) {
              setUserData({
                name: userDataFromFirestore.name,
                email: currentUser.email || ''
              });
            }
          } else {
            console.log('Documento do usuário não encontrado.');
          }
        } catch (error) {
          console.error('Erro ao buscar dados do usuário:', error);
        }
      };

      fetchUserData();
    }
  }, [currentUser]);

  return (
    <div className='AdminView'>
      <h1>Área de Administração</h1>
      {userData ? (
        <>
          <p>Bem-vindo, {userData.name}!</p>
          <p>Seu e-mail: {userData.email}</p>
          <p>Esta é uma área restrita para administradores.</p>
        </>
      ) : (
        <p>Carregando informações do usuário...</p>
      )}
    </div>
  );
};

export default AdminView;
