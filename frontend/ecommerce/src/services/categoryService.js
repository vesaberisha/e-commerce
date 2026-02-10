import axios from 'axios';

const API_URL = '/api/categories/';

const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData, { headers: getAuthHeaders() });
  return response.data;
};

const updateCategory = async (id, categoryData) => {
  const response = await axios.put(API_URL + id, categoryData, { headers: getAuthHeaders() });
  return response.data;
};

const deleteCategory = async (id) => {
  await axios.delete(API_URL + id, { headers: getAuthHeaders() });
};

export { getCategories, createCategory, updateCategory, deleteCategory };