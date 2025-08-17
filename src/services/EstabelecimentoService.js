import { message } from 'antd'
import api from './api'

export const getEstabelecimentos = async () => {
    try {
        const res = await api.get('/estabelecimentos/resumo')
        return res.data;
    } catch (err) {
        message.error({
            content: 'Erro ao listar estabelecimentos.',
            key: 'estabelecimentos_error',
            duration: 3
        });
    }
}