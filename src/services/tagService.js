import api from './api';
import endpoints from '../constants/ApiEndPoints';

export const getTagsPopulares = () => {
  return api.get(`/${endpoints.tag}/populares/listar`);
};
