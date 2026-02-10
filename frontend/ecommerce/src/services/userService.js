import axios from 'axios';

const API_URL = '/api/users/';

const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export { getAllUsers };