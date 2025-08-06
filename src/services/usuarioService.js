import api from './api';
import endpoints from '../constants/ApiEndPoints';

export async function criarUsuario(formData) {
  try {
    await api.post(`/${endpoints.usuario}/criar`, formData);
    return { sucesso: true };
  } catch (err) {
    const mensagem =
      err.response?.data?.message || 'Erro ao cadastrar. Verifique se e-mail ou usuário já estão em uso.';
    return { sucesso: false, erro: mensagem };
  }
}
