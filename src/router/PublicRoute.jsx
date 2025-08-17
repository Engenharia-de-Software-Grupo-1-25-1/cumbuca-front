import { Navigate } from 'react-router-dom';

export default function PublicRoute({ children }) {
  const token = document.cookie.match(/(^| )auth_token=([^;]+)/);
  return token ? <Navigate to="/feed" replace /> : children;
}
