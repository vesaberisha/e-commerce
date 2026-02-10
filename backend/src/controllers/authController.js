const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'User exists' });

    const user = await createUser(username, email, password, role);
    res.status(201).json({ message: 'User created', user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) {
      console.log(`Login failed: User not found for email ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(`Login failed: Password mismatch for ${email}`);
      // console.log(`Input password: ${password}`); // Don't log passwords in prod, but for debug
      // console.log(`Stored hash: ${user.password}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const refresh = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'No token' });

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  });
};

module.exports = { register, login, refresh };