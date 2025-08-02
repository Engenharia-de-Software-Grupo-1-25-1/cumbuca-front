import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/useAuth';

export default function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/feed" replace /> : children;
}
