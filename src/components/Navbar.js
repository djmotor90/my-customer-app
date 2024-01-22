// Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Button, NavLink } from 'react-bootstrap';
import '../css/Navbar.css';

function CustomNavbar({ userData, handleLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Your App Name</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action1">Action 1</NavDropdown.Item>
            <NavDropdown.Item href="#action2">Action 2</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action3">Action 3</NavDropdown.Item>
          </NavDropdown>
          {/* Make the username clickable */}
          <div className="username-text">
            <NavLink to="/profile">{userData.firstName} {userData.lastName}</NavLink>
          </div>
          {/* Add the Logout button */}
          <div className="top-right">
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
