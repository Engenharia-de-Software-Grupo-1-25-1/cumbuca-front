import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const curtirAvaliacao = id => {
  return api.post(`/${endpoints.curtida}/${id}`);
};
