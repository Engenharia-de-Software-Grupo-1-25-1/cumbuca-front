import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const removerComentario = id => {
  return api.delete(`/${endpoints.comentario}/remover/${id}`);
};