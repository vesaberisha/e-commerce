import React, { useContext } from 'react';
import { Container, ListGroup, Button, Card, Row, Col } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
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
      <div className="page-header">
        <h2>Shopping Cart</h2>
        <p>Review your items and proceed to checkout</p>
      </div>
      {cart.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted mb-3">Your cart is empty</h4>
          <p className="text-muted">Add some products to get started!</p>
          <Link to="/" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <div className="bg-white rounded-3 p-4 shadow-sm">
              <h4 className="mb-4 fw-bold">Cart Items</h4>
              {cart.map((item) => (
                <div key={item.id} className="d-flex align-items-center mb-3 p-3 border rounded-2 bg-light">
                  {item.image_url && <img src={item.image_url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', marginRight: '20px' }} className="rounded" />}
                  <div className="flex-grow-1">
                    <h5 className="mb-1 fw-semibold">{item.name}</h5>
                    <p className="mb-0 text-muted">${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)} className="ms-3">Remove</Button>
                </div>
              ))}
            </div>
          </Col>
          <Col md={4}>
            <Card className="border-0 shadow-lg">
              <Card.Body className="p-4">
                <Card.Title className="fw-bold mb-4">Order Summary</Card.Title>
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal:</span>
                  <span className="fw-semibold">${total.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping:</span>
                  <span className="text-success fw-semibold">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold fs-5">Total:</span>
                  <span className="fw-bold fs-5 text-primary">${total.toFixed(2)}</span>
                </div>
                <Button variant="success" className="w-100 py-3 fw-semibold" onClick={handleCheckout}>Proceed to Checkout</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Cart;