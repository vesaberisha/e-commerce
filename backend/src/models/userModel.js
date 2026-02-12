const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (username, email, password, role = 'user') => {
  const hashedPassword = await bcrypt.hash(password, 10);  // 10 is salt rounds, secure enough
  const result = await pool.query(
    'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, email, hashedPassword, role]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserById };