import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest, logout as logoutRequest, getUser } from '../../services/authService';
import { AuthContext } from './AuthContextInstance';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res);
    } catch {
      setUser(null);
    }
  };

  const login = async (email, senha) => {
    await loginRequest(email, senha);
    const data = await fetchUser();
    navigate('/feed');
    return data;
  };

  const logout = async () => {
    logoutRequest();
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    if (localStorage.getItem('userId')) fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
