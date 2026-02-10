import axios from 'axios';

const API_URL = '/api/orders/';

const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const placeOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData, { headers: getAuthHeaders() });
  return response.data;
};

const getMyOrders = async () => {
  const response = await axios.get(API_URL + 'my', { headers: getAuthHeaders() });
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

const updateOrderStatus = async (id, status) => {
  const response = await axios.put(API_URL + id, { status }, { headers: getAuthHeaders() });
  return response.data;
};

export { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };