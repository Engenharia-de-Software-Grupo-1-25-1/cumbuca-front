import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const criarAvaliacao = formData => {
  return api.post(`/${endpoints.avaliacao}/criar`, formData);
};
