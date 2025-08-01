import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginRequest, logout as logoutRequest, getUser } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res.data);
    } catch {
      setUser(null);
    }
  };

  const login = async (email, senha) => {
    await loginRequest(email, senha);
    await fetchUser();
    navigate('/feed');
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
