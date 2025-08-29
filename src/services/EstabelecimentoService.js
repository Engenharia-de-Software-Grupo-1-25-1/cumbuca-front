import { message } from 'antd';
import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const getEstabelecimentos = async () => {
  try {
    const res = await api.get(`/${endpoints.estabelecimento}/listar`);
    return res.data;
  } catch (err) {
    message.error('Erro ao listar estabelecimentos.');
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
