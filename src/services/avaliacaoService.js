import api from './api';
import endpoints from '../constants/ApiEndPoints';
import qs from 'qs';

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

export const getAvaliacoes = (filtros = {}, ordenacao = null) => {
  const params = {};
  Object.entries(filtros || {}).forEach(([filtro, valor]) => {
    if (filtro === 'notas') {
      Object.entries(valor).forEach(([categoria, nota]) => {
        if (nota) params[categoria] = nota;
      });
      return;
    }

    if (filtro === 'tags' && Array.isArray(valor)) {
      params.tags = valor;
      return;
    }

    if (valor) {
      params[filtro] = valor;
    }
  });

  if (ordenacao) params.ordenador = ordenacao;
  return api.get(`/${endpoints.avaliacao}/listar`, {
    params,
    paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
  });
};

export const adicionarComentario = (idAvaliacao, texto) => {
  return api.post(`/${endpoints.avaliacao}/comentar/${idAvaliacao}`, texto, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};

export const getAvaliacoesEstabelecimento = estabelecimentoId => {
  return api.get(`/${endpoints.avaliacao}/listar`, { params: { idEstabelecimento: estabelecimentoId } });
};
