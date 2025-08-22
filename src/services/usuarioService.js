import api from './api';
import endpoints from '../constants/ApiEndPoints';
import { toISODateOnly } from '../utils/date';
import { normalizeFoto } from '../utils/image';

export const getUsuarioPorUsername = async username => {
  try {
    const { data } = await api.get(`/${endpoints.usuario}/recuperar/${encodeURIComponent(username)}`, {
      skipAuthRedirect: true,
    });

    const raw = data?.data && typeof data.data === 'object' ? data.data : data;

    return {
      sucesso: true,
      data: {
        id: raw?.id ?? null,
        nome: raw?.nome ?? '',
        username: raw?.username ?? '',
        email: raw?.email ?? '',
        dtNascimento: toISODateOnly(raw?.dtNascimento ?? ''),
        foto: normalizeFoto(raw?.foto ?? null),
      },
    };
  } catch (err) {
    const erro = err?.response?.data?.message || 'Erro ao carregar perfil.';
    return { sucesso: false, erro };
  }
};

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
