import { message } from 'antd';
import api from './api';

export const getAvaliacao = async id => {
  try {
    const res = await api.get(`/avaliacao/recuperar/${id}`);
    return res.data;
  } catch (err) {
    message.error(err.response?.data || 'Erro ao recuperar avaliacao');
    console.error(err);
    return false;
  }
};