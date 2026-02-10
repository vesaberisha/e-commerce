import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { register } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ username, email, password, role });
      navigate('/login');
    } catch (error) {
      alert('Registration failed. User may already exist.');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100">Register</Button>
      </Form>
      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </Container>
  );
};

export default Register;