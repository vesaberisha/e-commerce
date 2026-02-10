import axios from 'axios';

const API_URL = '/api/categories/';

const getCategories = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createCategory = async (categoryData) => {
  const response = await axios.post(API_URL, categoryData);
  return response.data;
};

const updateCategory = async (id, categoryData) => {
  const response = await axios.put(API_URL + id, categoryData);
  return response.data;
};

const deleteCategory = async (id) => {
  await axios.delete(API_URL + id);
};

export { getCategories, createCategory, updateCategory, deleteCategory };