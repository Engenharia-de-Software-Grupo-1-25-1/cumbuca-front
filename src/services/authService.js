import { message } from 'antd';
import api from './api';

export const login = async (username, senha) => {
  return api
    .post('/login', { username, senha })
    .then(res => {
      const token = res.data;
      localStorage.setItem('token', token);
      return token;
    })
    .catch(err => {
      message.error('Erro ao realizar login');
      console.error(err);
    });
};

export const logout = () => {
  localStorage.removeItem('token');
  message.success('Logout realizado com sucesso!');
};

export const getUser = async () => {
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
