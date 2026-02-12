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
    <BSNavbar bg="dark" variant="dark" expand="lg" className="px-3 py-2">
      <BSNavbar.Brand as={Link} to="/" className="fw-bold">
        <span className="text-primary">E</span>-commerce
      </BSNavbar.Brand>
      <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BSNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" className="mx-2">Products</Nav.Link>
          <Nav.Link as={Link} to="/cart" className="mx-2">Cart</Nav.Link>
          {user ? (
            <>
              <Nav.Link as={Link} to="/profile" className="mx-2">Profile</Nav.Link>
              <Nav.Link as={Link} to="/orders" className="mx-2">Orders</Nav.Link>
              {user.role === 'admin' && <Nav.Link as={Link} to="/admin" className="mx-2">Admin</Nav.Link>}
              <Nav.Link onClick={handleLogout} className="mx-2 text-danger">Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
              <Nav.Link as={Link} to="/register" className="mx-2">Register</Nav.Link>
            </>
          )}
        </Nav>
      </BSNavbar.Collapse>
    </BSNavbar>
  );
};

export default Navbar;