// LandingPage.js
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserId, setToken } from '../features/authSlice'; // Adjust the import path

function LandingPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const handleLoginClose = () => setShowLoginModal(false);
  const handleLoginShow = () => setShowLoginModal(true);
  const handleSignupClose = () => setShowSignupModal(false);
  const handleSignupShow = () => setShowSignupModal(true);

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', loginFormData, { withCredentials: true });
      console.log('Login Successful', response.data);

      dispatch(setUserId(response.data.userId)); // Assuming response contains userId
      dispatch(setToken(response.data.token));   // Assuming response contains token
      dispatch(setLogin(true));

      navigate('/mainapp');
    } catch (error) {
      console.error('Login Failed', error.response.data);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', signupFormData);
      console.log('Signup Successful', response.data);
      // Similar logic for signup if it also returns userId and token
      dispatch(setLogin(true));
      navigate('/mainapp');
    } catch (error) {
      console.error('Signup Failed', error.response.data);
    }
  };


  // Handler for logout
  const handleLogout = () => {
    dispatch(setLogin(false));
  };

  return (
    <div className="landing-page">
      {console.log('isLoggedIn:', isLoggedIn)}
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