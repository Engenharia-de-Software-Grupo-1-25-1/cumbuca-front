import { message } from 'antd';
import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const getEstabelecimentos = async (filtros = {}, ordenador = null) => {
  try {
    const params = {};
    Object.entries(filtros || {}).forEach(([filtro, valor]) => {
      if (valor) params[filtro] = valor;
    });

    if (ordenador) {
      params.ordenador = ordenador;
    }

    const res = await api.get(`${endpoints.estabelecimento}/listar`, { params });

    return res.data;
  } catch (err) {
    message.error('Erro ao listar estabelecimentos.');
    console.error(err);
    return [];
  }
};

export const getEstabelecimentoById = async id => {
  try {
    const res = await api.get(`/${endpoints.estabelecimento}/recuperar/${id}`);
    return res.data;
  } catch (err) {
    message.error('Erro ao buscar estabelecimento.');
    console.error(err);
  }
};

export const favoritarEstabelecimento = async id => {
  try {
    const res = await api.post(`/${endpoints.estabelecimento}/favoritar/${id}`);
    return res.data;
  } catch (err) {
    message.error('Erro ao favoritar estabelecimento.');
    console.error(err);
  }
};

const filtros = {
  nome: '',
  categoria: null,
  local: null,
  favoritado: null,
  notaGeral: null,
};

export const getEstabelecimentosContainingNome = async nome => {
  filtros.nome = nome;
  return api.get(`/${endpoints.estabelecimento}/listar`, { params: filtros });
};
