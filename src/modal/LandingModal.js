import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function LandingModal({
  showLoginModal,
  handleLoginClose,
  showSignupModal,
  handleSignupClose,
  loginFormData,
  handleLoginInputChange,
  handleLoginSubmit,
  signupFormData,
  handleSignupInputChange,
  handleSignupSubmit,
}) {
    return (
        <>
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

      </>
  );
}

export default LandingModal;