import axios from 'axios';

const API_URL = '/api/users/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getAllUsers = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

export { getAllUsers };