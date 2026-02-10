import React, { useContext } from 'react';
import { Container, ListGroup, Button, Card, Row, Col } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/orderService';

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    const items = cart.map(({ id, quantity, price }) => ({ product_id: id, quantity, price }));
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await placeOrder({ total, items });
    navigate('/orders');
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cart.map((item) => (
                <ListGroup.Item key={item.id} className="d-flex align-items-center mb-3 shadow-sm rounded">
                  {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '20px' }} />}
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="mb-0 text-muted">${item.price} x {item.quantity}</p>
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>Remove</Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>
                <h4 className="my-3">Total: ${total.toFixed(2)}</h4>
                <Button variant="success" className="w-100" onClick={handleCheckout}>Proceed to Checkout</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;