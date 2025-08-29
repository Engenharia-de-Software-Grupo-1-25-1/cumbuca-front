import { message } from 'antd';
import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const getEstabelecimentos = async (filtros = {}, ordenador = null) => {
  try {
    const params = {};
    Object.entries(filtros || {}).forEach(([filtro, valor]) => {
      if (valor !== null && valor !== undefined) params[filtro] = valor;
      console.log('filtro:', filtro, 'valor:', valor, 'tipo:', typeof valor);
    });

    if (ordenador !== null && ordenador !== undefined) {
      params.ordenador = ordenador;
    }

    const res = await api.get(`${endpoints.estabelecimento}/listar`, {
      params,
      skipAuthRedirect: true,
    });

    return res.data;
  } catch (err) {
    message.error('Erro ao listar estabelecimentos.');
    console.error(err);
    return [];
  }
};

export const getEstabelecimentoById = async (id) => {
    try {
        const res = await api.get(`/${endpoints.estabelecimento}/recuperar/${id}`);
        return res.data;
    } catch (err) {
        message.error('Erro ao buscar estabelecimento.');
        console.error(err);
    }
    
};

export const favoritarEstabelecimento = async (id) => {
    try {
        const res = await api.post(`/${endpoints.estabelecimento}/favoritar/${id}`);
        return res.data;
    } catch (err) {
        message.error('Erro ao favoritar estabelecimento.');
        console.error(err);
    }
};