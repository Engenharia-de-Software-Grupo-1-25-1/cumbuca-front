import { message } from 'antd';
import api from './api';
import ApiEndPoints from '../constants/ApiEndPoints';

export const login = async (username, senha) => {
  return api
    .post(`/${ApiEndPoints.login}`, { username, senha })
    .then(res => {
      document.cookie = `auth_token=${res.data.token}; path=/; max-age=${60 * 60 * 24}`;
      const userId = res.data.id;
      localStorage.setItem('userId', userId);
      message.success('Login realizado com sucesso!');
      return userId;
    })
    .catch(err => {
      message.error(err.response.data || 'Erro ao realizar login');
      console.error(err);
    });
};

export const logout = (silent = false) => {
  document.cookie = 'auth_token=; path=/; max-age=0';
  localStorage.removeItem('userId');
  sessionStorage.removeItem('tagsPopulares');
  if (!silent) {
    message.success('Logout realizado com sucesso!');
  }
};

export const getUser = async () => {
  return api
    .get(`/${ApiEndPoints.usuario}/recuperar/${localStorage.getItem('userId')}`)
    .then(res => {
      return res.data;
    })
    .catch(err => {
      message.error(err.response.data || 'Erro ao buscar dados do usuário!');
      console.error(err);
    });
};
