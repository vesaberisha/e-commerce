import React, { useState, useEffect, useContext } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { getMyOrders } from '../services/orderService';
import { AuthContext } from '../context/AuthContext';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const data = await getMyOrders();
        setOrders(data);
      };
      fetchOrders();
    }
  }, [user]);

  return (
    <Container>
      <h2>My Orders</h2>
      <ListGroup>
        {orders.map((order) => (
          <ListGroup.Item key={order.id}>
            Order #{order.id} - ${order.total} - Status: {order.status}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Orders;