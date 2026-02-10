const { getAllCategories, createCategory, updateCategory, deleteCategory } = require('../models/categoryModel');

const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await createCategory(name, description);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const category = await updateCategory(id, name, description);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const removeCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteCategory(id);
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getCategories, addCategory, editCategory, removeCategory };