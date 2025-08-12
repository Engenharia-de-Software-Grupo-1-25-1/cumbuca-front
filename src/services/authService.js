import { message } from 'antd';
import api from './api';
import ApiEndPoints from '../constants/ApiEndPoints';

export const login = async (username, senha) => {
  return api
    .post(`/${ApiEndPoints.login}`, { username, senha })
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
    .get(`/${ApiEndPoints.usuario}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      message.error('Erro ao buscar dados do usuário!');
      console.error(err);
    });
};
