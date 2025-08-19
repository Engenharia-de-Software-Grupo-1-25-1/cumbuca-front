import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const criarUsuario = formData => {
  return api.post(`/${endpoints.usuario}/criar`, formData);
};

export const getUsuarioPorUsername = username => {
  return api.get(`/${endpoints.usuario}/recuperar/${username}`);
};
