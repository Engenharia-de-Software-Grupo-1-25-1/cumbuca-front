import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const criarAvaliacao = formData => {
  return api.post(`/${endpoints.avaliacao}/criar`, formData);
};

export const obterAvaliacao = id => {
  return api.post(`/${endpoints.avaliacao}/buscar/${id}`);
};

export const atualizarAvaliacao = (id, formData) => {
  return api.post(`/${endpoints.avaliacao}/atualizar/${id}`, formData);
};
