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

export const getAvaliacoesEstabelecimento = estabelecimentoId => {
  return api.get(`/${endpoints.avaliacao}/listar`, { params: { idEstabelecimento: estabelecimentoId } });
};

export const getAvaliacoesFeed = async (filtros = {}, ordenacao = null) => {
  try {
    const params = {};
    Object.entries(filtros || {}).forEach(([filtro, valor]) => {
      if (valor !== null && valor !== undefined) params[filtro] = valor;
    });

    if (ordenacao !== null && ordenacao !== undefined) {
      params.ordenacao = ordenacao;
    }
    const res = await api.get(`/${endpoints.avaliacao}/listar`, {
      params,
      skipAuthRedirect: true,
    });
    return res.data;
  } catch (err) {
    console.error('Erro ao listar avaliações do feed.', err);
    return [];
  }
};

