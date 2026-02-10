import React, { useContext } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    // Implement order placement later
    navigate('/orders');
  };

  return (
    <Container>
      <h2>Cart</h2>
      <ListGroup>
        {cart.map((item) => (
          <ListGroup.Item key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
            <Button variant="danger" onClick={() => removeFromCart(item.id)}>Remove</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <p>Total: ${total}</p>
      <Button onClick={handleCheckout}>Checkout</Button>
    </Container>
  );
};

export default Cart;