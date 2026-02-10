import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProduct } from '../services/productService';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
// Assume we have addToCart function, add later


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
    // Implement later
    addToCart(product);

    alert('Added to cart');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <Container>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </Container>
  );
};

export default ProductDetails;