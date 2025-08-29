import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const criarAvaliacao = formData => {
  return api.post(`/${endpoints.avaliacao}/criar`, formData);
};

export const obterAvaliacao = id => {
  return api.get(`/${endpoints.avaliacao}/recuperar/${id}`);
};

export const atualizarAvaliacao = (id, formData) => {
  return api.put(`/${endpoints.avaliacao}/atualizar/${id}`, formData);
};

export const removerAvaliacao = id => {
  return api.delete(`/${endpoints.avaliacao}/remover/${id}`);
};

export const getAvaliacoesUsuario = userId => {
  return api.get(`/${endpoints.avaliacao}/listar`, { params: { idUsuario: userId } });
};

export const adicionarComentario = (idAvaliacao, texto) => {
  return api.post(`/${endpoints.avaliacao}/comentar/${idAvaliacao}`, texto, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
