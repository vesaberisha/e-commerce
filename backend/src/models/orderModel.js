const pool = require('../config/db');

const createOrder = async (user_id, total, items) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const orderResult = await client.query(
      'INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *',
      [user_id, total]
    );
    const order = orderResult.rows[0];

    for (const item of items) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
        [order.id, item.product_id, item.quantity, item.price]
      );
      // Update stock
      await client.query('UPDATE products SET stock = stock - $1 WHERE id = $2', [item.quantity, item.product_id]);
    }

    await client.query('COMMIT');
    return order;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getUserOrders = async (user_id) => {
  const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [user_id]);
  return result.rows;
};

const getAllOrders = async () => {
  const result = await pool.query('SELECT * FROM orders');
  return result.rows;
};

const updateOrderStatus = async (id, status) => {
  const result = await pool.query('UPDATE orders SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
  return result.rows[0];
};

module.exports = { createOrder, getUserOrders, getAllOrders, updateOrderStatus };