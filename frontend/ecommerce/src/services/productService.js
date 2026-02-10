import axios from 'axios';

const API_URL = '/api/products/';

const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getProduct = async (id) => {
  const response = await axios.get(API_URL + id);
  return response.data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Admin only
const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, { headers: getAuthHeaders() });
  return response.data;
};

const updateProduct = async (id, productData) => {
  const response = await axios.put(API_URL + id, productData, { headers: getAuthHeaders() });
  return response.data;
};

const deleteProduct = async (id) => {
  await axios.delete(API_URL + id, { headers: getAuthHeaders() });
};

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct };