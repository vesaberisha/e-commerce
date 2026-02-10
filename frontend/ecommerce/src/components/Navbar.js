import React, { useContext } from 'react';
import { Navbar as BSNavbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <BSNavbar bg="light" expand="lg">
      <BSNavbar.Brand as={Link} to="/">E-commerce</BSNavbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/">Products</Nav.Link>
        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
        {user ? (
          <>
            <Nav.Link as={Link} to="/orders">Orders</Nav.Link>
            {user.role === 'admin' && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>
          </>
        )}
      </Nav>
    </BSNavbar>
  );
};

export default Navbar;