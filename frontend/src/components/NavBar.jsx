// src/components/NavBar.js
import React from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Anime</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/anime-pics">Home</Nav.Link>
            <Nav.Link as={Link} to="/anime-review">Review</Nav.Link>
          </Nav>
          {user ? (
            <>
              <Navbar.Text className="me-3">Hi, {user.username}</Navbar.Text>
              <Button variant="outline-secondary" onClick={onLogout}>Logout</Button>
            </>
          ) : (
            <Button variant="primary" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
