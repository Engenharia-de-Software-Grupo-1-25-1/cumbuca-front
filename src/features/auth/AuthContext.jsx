import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginRequest, logout as logoutRequest, getUser } from '../../services/authService';
import { AuthContext } from './AuthContextInstance';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchUser = useCallback(async () => {
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
  }, []);

  const login = useCallback(
    async (email, senha) => {
      try {
        await loginRequest(email, senha);
        const data = await fetchUser();
        navigate('/feed');
        return data;
      } catch {
        return null;
      }
    },
    [fetchUser, navigate]
  );

  const logout = useCallback(async () => {
    logoutRequest();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const hasUserId = localStorage.getItem('userId');
    const hasToken = document.cookie.includes('auth_token=');
    if (hasUserId && hasToken) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  const value = useMemo(() => ({ user, loading, login, logout }), [user, loading, login, logout]);

  if (loading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
