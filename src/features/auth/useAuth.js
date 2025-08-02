import { useContext } from 'react';
import { AuthContext } from './AuthContextInstance';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth precisa estar dentro de <AuthProvider>');
  }
  return context;
};
