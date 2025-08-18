import axios from 'axios';
import { message } from 'antd';
import { logout } from './authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

api.interceptors.request.use(
  config => {
    const token = document.cookie.match(/(^| )auth_token=([^;]+)/);
    if (token) {
      config.headers.Authorization = `Bearer ${token[2]}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      message.error('Tempo de sessão encerrado, redirecionando para login!');
      logout();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
