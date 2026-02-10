import axios from 'axios';
import { refreshToken } from '../services/authService';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);