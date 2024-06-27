import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import {  useAuth } from '../context/AuthContext/AuthContext';

interface Props {
  children?: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" />;
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  // Se o usuário está autenticado e é um administrador, renderize os filhos
  return <>{children}</>;
};
