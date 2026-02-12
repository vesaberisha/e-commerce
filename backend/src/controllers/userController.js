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

const createAdmin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User exists' });

    const user = await createUser(username, email, password, 'admin');
    res.status(201).json({ message: 'Admin created', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllUsers, createAdmin };
