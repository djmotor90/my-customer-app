// LandingPage.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check localStorage on component mount to set initial isLoggedIn state
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(storedIsLoggedIn);
  }, []);

  // Handlers for opening and closing modals
  const handleLoginClose = () => setShowLoginModal(false);
  const handleLoginShow = () => setShowLoginModal(true);
  const handleSignupClose = () => setShowSignupModal(false);
  const handleSignupShow = () => setShowSignupModal(true);

  // Handlers for form input changes
  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  // Handler for login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your login route on the server
      const response = await axios.post('/api/auth/login', loginFormData, { withCredentials: true });

      console.log('Login Successful', response.data);

      // Store userId in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', response.data.userId); // Assuming the server response contains userId
      console.log('userId:', response.data.userId);
      setIsLoggedIn(true); // Set isLoggedIn to true after successful login

      // Redirect to MainApp after successful login
      navigate('/mainapp'); // Use navigate to redirect to the /mainapp route
    } catch (error) {
      console.error('Login Failed', error.response.data);
      // Handle login failure, show error message, etc.
    }
  };

  // Handler for signup form submission
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to your signup route on the server
      const response = await axios.post('/api/auth/signup', signupFormData);

      console.log('Signup Successful', response.data);

      // Store userId in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userId', response.data.userId); // Assuming the server response contains userId

      setIsLoggedIn(true); // Set isLoggedIn to true after successful signup

      // Redirect to MainApp after successful signup
      navigate('/mainapp'); // Use navigate to redirect to the /mainapp route
    } catch (error) {
      console.error('Signup Failed', error.response.data);
      // Handle signup failure, show error message, etc.
    }
  };

  const handleLogout = () => {
    // Clear isLoggedIn state in localStorage and set it to false
    localStorage.setItem('isLoggedIn', 'false');

    setIsLoggedIn(false); // Set isLoggedIn to false after logout
  };

  return (
    <div className="landing-page">
      {console.log('isLoggedIn:', isLoggedIn)} {/* Add this line */}
      {isLoggedIn ? (
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      ) : (
        <>
          <Button variant="primary" onClick={handleLoginShow}>
            Login
          </Button>
          <Button variant="success" onClick={handleSignupShow}>
            SignUp
          </Button>
        </>
      )}

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={handleLoginClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            {/* Add login form fields here */}
            <Form.Group controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={loginFormData.email}
                onChange={handleLoginInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={loginFormData.password}
                onChange={handleLoginInputChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLoginClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Signup Modal */}
      <Modal show={showSignupModal} onHide={handleSignupClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignupSubmit}>
            {/* Add signup form fields here */}
            <Form.Group controlId="signupFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                name="firstName"
                value={signupFormData.firstName}
                onChange={handleSignupInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                name="lastName"
                value={signupFormData.lastName}
                onChange={handleSignupInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={signupFormData.email}
                onChange={handleSignupInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={signupFormData.password}
                onChange={handleSignupInputChange}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Sign Up
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSignupClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LandingPage;

