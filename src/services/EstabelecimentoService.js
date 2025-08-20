import { message } from 'antd'
import api from './api'
import endpoints from '../constants/ApiEndPoints'

export const getEstabelecimentos = async () => {
    try {
        const res = await api.get(`/${endpoints.estabelecimento}/listar`)
        return res.data;
    } catch (err) {
        message.error('Erro ao listar estabelecimentos.');
        console.error(err);
    }
}