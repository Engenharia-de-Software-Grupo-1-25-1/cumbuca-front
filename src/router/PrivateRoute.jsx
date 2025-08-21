import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const token = document.cookie.match(/(^| )auth_token=([^;]+)/);
  return token ? children : <Navigate to="/login" />;
}
