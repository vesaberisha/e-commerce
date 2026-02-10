import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getProducts } from '../services/productService';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("API did not return an array:", data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <h2>Products</h2>
      <Row>
        {products.map((product) => (
          <Col md={4} key={product.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top" src={product.image_url} style={{ height: '200px', objectFit: 'contain', padding: '10px' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="text-muted">${product.price}</Card.Text>
                <Link to={`/product/${product.id}`} className="btn btn-primary mt-auto">Details</Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Products;