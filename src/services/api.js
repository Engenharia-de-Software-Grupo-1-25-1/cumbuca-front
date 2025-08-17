import axios from 'axios';

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
  error => {
    return Promise.reject(error);
  }
);

export default api;
