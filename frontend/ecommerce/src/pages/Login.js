import React, { useState, useContext } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { login as authLogin } from '../services/authService'; // Rename service login
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authLogin({ email, password });
      const decoded = jwtDecode(data.accessToken);
      login({ id: decoded.id, role: decoded.role });
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">Login</Button>
      </Form>
      <p className="mt-3 text-center">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </Container>
  );
};

export default Login;