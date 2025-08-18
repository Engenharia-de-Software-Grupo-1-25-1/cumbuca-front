import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest, logout as logoutRequest, getUser } from '../../services/authService';
import { AuthContext } from './AuthContextInstance';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res);
      return res;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
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
    const hasUserId = !!localStorage.getItem('userId');
    const hasToken = document.cookie.includes('auth_token=');
    if (hasUserId && hasToken) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading]);

  if (loading) return null;

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
