const express = require('express');
const { getCategories, addCategory, editCategory, removeCategory } = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getCategories);  // Public
router.post('/', protect, admin, addCategory);
router.put('/:id', protect, admin, editCategory);
router.delete('/:id', protect, admin, removeCategory);

module.exports = router;