import api from './api';

const isDev = import.meta.env.VITE_DEV;

export const login = async (email, senha) => {
  if (isDev) {
    if (email === 'admin' && senha === '123') {
      return { data: 'OK' };
    }
    throw new Error('Login inválido');
  }

  return await api.post('/login', { email, senha });
};

export const logout = async () => {
  if (isDev) {
    console.log('[MOCK] Logout');
    return { data: 'Deslogado' };
  }

  return await api.post('/logout');
};

export const getUser = async () => {
  if (isDev) {
    console.log('[MOCK] Buscando usuário');
    return {
      data: {
        id: 1,
        nome: 'ADMIN',
        email: 'admin@cumbuca.com',
      },
    };
  }

  return await api.get('/user');
};
