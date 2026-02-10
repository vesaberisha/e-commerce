const { createOrder, getUserOrders, getAllOrders, updateOrderStatus } = require('../models/orderModel');

const placeOrder = async (req, res) => {
  const { total, items } = req.body;
  const user_id = req.user.id;
  try {
    const order = await createOrder(user_id, total, items);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getMyOrders = async (req, res) => {
  const user_id = req.user.id;
  try {
    const orders = await getUserOrders(user_id);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const order = await updateOrderStatus(id, status);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { placeOrder, getMyOrders, getOrders, updateStatus };