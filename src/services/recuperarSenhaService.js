import { message } from 'antd';
import api from './api';

export const recSenha = async (email) => {
  try {
    const res = await api.post('/recuperarSenha', { email });
    message.success(res.data);
    return true;
  } catch (err) {
    message.error(err.response?.data || 'Erro ao recuperar senha');
    console.error(err);
    return false;
  }
};
