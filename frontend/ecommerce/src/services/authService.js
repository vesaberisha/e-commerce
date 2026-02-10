import axios from 'axios';

const API_URL = '/api/auth/';

const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  if (response.data) {
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  }
  return response.data;
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axios.post(API_URL + 'refresh', { refreshToken });
  if (response.data.accessToken) {
    localStorage.setItem('accessToken', response.data.accessToken);
  }
  return response.data.accessToken;
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export { register, login, refreshToken, logout };