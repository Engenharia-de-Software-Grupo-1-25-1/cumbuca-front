import api from './api';
import endpoints from '../constants/ApiEndPoints';

// busca as tags mais populares
export const getTagsPopulares = async (limit = 5) => {
  const { data } = await api.get(`/${endpoints.tag}/populares/listar`, {
    params: { limit },
  });

  const normalizado = Array.isArray(data)
    ? data.map(t => ({
        tag: t.tag ?? t.nome ?? String(t),
        quantidade: Number(t.quantidade ?? t.count ?? 0),
      }))
    : [];

  return normalizado.slice(0, limit);
};
