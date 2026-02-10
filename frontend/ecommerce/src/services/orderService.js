import axios from 'axios';

const API_URL = '/api/orders/';

const placeOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};

const getMyOrders = async () => {
  const response = await axios.get(API_URL + 'my');
  return response.data;
};

const getAllOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const updateOrderStatus = async (id, status) => {
  const response = await axios.put(API_URL + id, { status });
  return response.data;
};

export { placeOrder, getMyOrders, getAllOrders, updateOrderStatus };