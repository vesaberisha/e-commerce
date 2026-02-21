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

const updateUserById = async (id, updates) => {
  const fields = [];
  const values = [];
  let index = 1;

  if (updates.username) {
    fields.push(`username = $${index++}`);
    values.push(updates.username);
  }
  if (updates.email) {
    fields.push(`email = $${index++}`);
    values.push(updates.email);
  }
  if (updates.role) {
    fields.push(`role = $${index++}`);
    values.push(updates.role);
  }

  if (fields.length === 0) return null;

  values.push(id);
  const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`;
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail, findUserById, updateUserById };
