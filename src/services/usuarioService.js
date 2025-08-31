import api from './api';
import endpoints from '../constants/ApiEndPoints';

export async function atualizarPerfil(id, formData) {
  try {
    await api.put(`/${endpoints.usuario}/atualizar/${encodeURIComponent(id)}`, formData);
    return { sucesso: true };
  } catch (err) {
    const erro = err?.response?.data?.message || 'Erro ao atualizar o perfil.';
    return { sucesso: false, erro };
  }
}

export const criarUsuario = formData => {
  return api.post(`/${endpoints.usuario}/criar`, formData);
};

export const getUsuarioPorUsername = username => {
  return api.get(`/${endpoints.usuario}/recuperar/${username}`);
};

export const getUsuariosContainingNome = nome => {
  return api.get(`/${endpoints.usuario}/listar`,{ params: {nome: nome}});
};
