const express = require('express');
const { getAllUsers, createAdmin } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, admin, getAllUsers);
router.post('/admin', protect, admin, createAdmin);

module.exports = router;
