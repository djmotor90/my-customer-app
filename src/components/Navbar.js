// Navbar.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserId, setToken } from '../features/authSlice'; // Adjust the import path if necessary
import '../css/Navbar.css'; // Import your custom CSS

function CustomNavbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData); // Retrieve user data from Redux store

  // Handle the logout functionality
  const handleLogout = () => {
    dispatch(setLogin(false));   // Update login state
    dispatch(setUserId(null));   // Clear the user ID from Redux store
    dispatch(setToken(null));    // Clear the token from Redux store
    // Add any additional logout logic if necessary
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Your App Name</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/mainapp">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <Nav.Link href="#about">Add Workspace</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action1">Action 1</NavDropdown.Item>
            <NavDropdown.Item href="#action2">Action 2</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action3">Action 3</NavDropdown.Item>
          </NavDropdown>
          {userData && (
            <>
              <div className="username-text">
                <Nav.Link href="/profile">{userData.firstName} {userData.lastName}</Nav.Link>
              </div>
              <div className="top-right">
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </div>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;

