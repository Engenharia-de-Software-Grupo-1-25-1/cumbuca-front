import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const getAvaliacoesUsuario = userId => {
  return api.get(`/${endpoints.avaliacao}/usuario/${userId}`);
};
