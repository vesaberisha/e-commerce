const pool = require('../config/db');
const { createUser, findUserByEmail } = require('../models/userModel');

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, role, created_at FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createUserByAdmin = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User exists' });

    const user = await createUser(username, email, password, role || 'user');
    res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;
  try {
    const updatedUser = await updateUserById(id, { username, email, role });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ message: 'User updated', user: { id: updatedUser.id, username: updatedUser.username, email: updatedUser.email, role: updatedUser.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllUsers, createUserByAdmin, updateUser };
