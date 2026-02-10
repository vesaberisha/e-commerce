import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/productService';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert('Added to cart');
  };

  if (!product) return <p className="text-center mt-5">Loading...</p>;

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          {product.image_url && <Image src={product.image_url} alt={product.name} fluid className="rounded shadow" style={{ maxHeight: '500px', objectFit: 'contain', width: '100%' }} />}
        </Col>
        <Col md={6}>
          <h2 className="display-5">{product.name}</h2>
          <p className="lead text-muted">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <Button variant="primary" size="lg" onClick={handleAddToCart} className="mt-3">Add to Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;