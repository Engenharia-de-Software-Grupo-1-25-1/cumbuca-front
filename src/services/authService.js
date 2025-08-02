import { message } from 'antd';
import api from './api';

const isDev = import.meta.env.VITE_DEV;

export const login = (email, senha) => {
  if (isDev) {
    return new Promise((resolve, reject) => {
      console.log('[MOCK] Tentando login com:', email);
      if (email === 'admin' && senha === '123') {
        resolve({ data: 'OK' });
      } else {
        reject(new Error('Login inválido'));
      }
    })
      .then(res => {
        console.log('[MOCK] Login bem-sucedido:', res);
        return res;
      })
      .catch(err => {
        console.error('[MOCK] Erro no login:', err.message);
        throw err;
      });
  }

  return api
    .post('/login', { email, senha })
    .then(res => {
      return res.data;
    })
    .catch(err => {
      message.error('Erro ao realizar login');
      console.error(err);
    });
};

export const logout = () => {
  if (isDev) {
    return new Promise(resolve => {
      console.log('[MOCK] Logout realizado');
      resolve({ data: 'Deslogado' });
    }).then(res => {
      return res;
    });
  }

  return api
    .post('/logout')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      message.error('Erro ao realizar logout');
      console.error(err);
    });
};

export const getUser = () => {
  if (isDev) {
    return new Promise(resolve => {
      console.log('[MOCK] Buscando usuário');
      resolve({
        data: {
          id: 1,
          nome: 'ADMIN',
          email: 'admin@cumbuca.com',
        },
      });
    }).then(res => {
      console.log('[MOCK] Usuário encontrado:', res.data);
      return res;
    });
  }

  return api
    .get('/user')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      message.error('Erro ao buscar dados do usuário!');
      console.error(err);
    });
};
