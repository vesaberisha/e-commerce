const express = require('express');
const { getProducts, getProduct, addProduct, editProduct, removeProduct } = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getProducts);  // Public
router.get('/:id', getProduct);  // Public
router.post('/', protect, admin, addProduct);
router.put('/:id', protect, admin, editProduct);
router.delete('/:id', protect, admin, removeProduct);

module.exports = router;