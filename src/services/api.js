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

let isRedirecting = false;

api.interceptors.response.use(
  response => response,
  error => {
    const status = error.response?.status;
    const skipRedirect = error.config?.skipAuthRedirect;

    if (!skipRedirect && (status === 401 || status === 403) && !isRedirecting) {
      isRedirecting = true;

      message.error('Tempo de sessão encerrado, redirecionando para login!');

      logout?.(true);

      setTimeout(() => {
        window.location.assign('/login');
      }, 1000);
    }

    return Promise.reject(error);
  }
);

export default api;
