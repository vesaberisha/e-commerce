const express = require('express');
const { placeOrder, getMyOrders, getOrders, updateStatus } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, placeOrder);
router.get('/my', protect, getMyOrders);
router.get('/', protect, admin, getOrders);
router.put('/:id', protect, admin, updateStatus);

module.exports = router;