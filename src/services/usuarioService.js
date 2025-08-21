import api from './api';
import endpoints from '../constants/ApiEndPoints';

//get dados do usuário logado
export async function getPerfil() {
  try {
    const { data } = await api.get(`/${endpoints.usuario}/me`);
    //esperado do back: { nome, username, email, dtNascimento: 'yyy-MM-dd', foto }
    return { sucesso: true, data };
  } catch (err) {
    const erro = err.response?.data?.message || 'Erro ao carregar perfil.';
    return { sucesso: false, erro };
  }
}

//put atualização do perfil
export async function atualizarPerfil(formData) {
  try {
    await api.put(`/${endpoints.usuario}/me`, formData);
    return { sucesso: true };
  } catch (err) {
    const erro = err.response?.data?.message || 'Erro ao atualizar o perfil.';
    return { sucesso: false, erro };
  }
}

export const criarUsuario = formData => {
  return api.post(`/${endpoints.usuario}/criar`, formData);
};

export const getUsuarioPorUsername = username => {
  return api.get(`/${endpoints.usuario}/recuperar/${username}`, {
    skipAuthRedirect: true,
  });
};
