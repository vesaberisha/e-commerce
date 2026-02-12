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
    <Container className="mt-5 d-flex justify-content-center">
      <div className="bg-white p-4 rounded-3 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email Address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 py-2 mb-3">
            Sign In
          </Button>
        </Form>
        <p className="mt-3 text-center mb-0">
          Don't have an account? <Link to="/register" className="text-decoration-none fw-semibold">Register here</Link>
        </p>
      </div>
    </Container>
  );
};

export default Login;