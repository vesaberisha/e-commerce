const express = require('express');
const { getAllUsers, createUserByAdmin, updateUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, admin, getAllUsers);
router.post('/', protect, admin, createUserByAdmin);
router.put('/:id', protect, admin, updateUser);

module.exports = router;
