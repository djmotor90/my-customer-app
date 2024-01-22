import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import './MainApp.css'; // Import your CSS file for custom styling

function MainApp() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Read isLoggedIn state from localStorage on component mount
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Read user ID from localStorage (assuming it was stored during login)
  const userId = localStorage.getItem('userId');

  // Redirect if not authenticated
  useEffect(() => {
    console.log('Checking authentication... isLoggedIn:', isLoggedIn);
    if (!isLoggedIn) {
      console.log('Redirecting to home page');
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isLoggedIn && userId) {
        console.log('Fetching user data', userId, isLoggedIn);
        try {
          // Fetch user data based on the user's ID
          const response = await axios.get(`/api/users/${userId}`);
          setUserData(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [isLoggedIn, userId]);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      // Clear isLoggedIn and userId in localStorage and set them to false and null, respectively
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.setItem('userId', null);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!userData) {
    return <p>User not found.</p>;
  }

  return (
    <div className="main-app">
      {/* Add the Bootstrap Navbar */}
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
            <Nav.Link href="#contact">Contact</Nav.Link>
            {/* Add the Logout button */}
            <div className="top-right">
        <Button variant="danger" onClick={handleLogout}>Logout</Button>
      </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <h1>Welcome to the Main Application</h1>
      <h2>User Information</h2>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}






export default MainApp;

