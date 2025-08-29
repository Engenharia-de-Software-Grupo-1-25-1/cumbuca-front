import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const criarAvaliacao = formData => api.post(`/${endpoints.avaliacao}/criar`, formData);

export const obterAvaliacao = id => api.get(`/${endpoints.avaliacao}/recuperar/${id}`);

export const atualizarAvaliacao = (id, formData) => api.put(`/${endpoints.avaliacao}/atualizar/${id}`, formData);

export const removerAvaliacao = id => api.delete(`/${endpoints.avaliacao}/remover/${id}`);

export const getAvaliacoesUsuario = userId =>
  api.get(`/${endpoints.avaliacao}/listar`, { params: { idUsuario: userId } });

export const getAvaliacoes = () => api.get(`/${endpoints.avaliacao}/listar`);
