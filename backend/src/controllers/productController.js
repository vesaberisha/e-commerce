const { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../models/productModel');

const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const addProduct = async (req, res) => {
  const { name, description, price, stock, category_id, image_url } = req.body;
  try {
    const product = await createProduct(name, description, price, stock, category_id, image_url);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const editProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category_id, image_url } = req.body;
  try {
    const product = await updateProduct(id, name, description, price, stock, category_id, image_url);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteProduct(id);
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getProducts, getProduct, addProduct, editProduct, removeProduct };