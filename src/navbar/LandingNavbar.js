import React, { useState } from 'react';
import { Button, Navbar, Nav, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserId, setToken } from '../features/authSlice';
import LandingModal from '../modal/LandingModal';
import '../css/LandingPage.css';

function LandingNavbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [showSignupFeedbackModal, setShowSignupFeedbackModal] = useState(false);
const [signupFeedbackMessage, setSignupFeedbackMessage] = useState('');

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

      dispatch(setUserId(response.data.userId));
      dispatch(setToken(response.data.token));
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
  
      setShowSignupModal(false);
      setSignupFeedbackMessage(`You are successfully signed up, now login.`);
      setShowSignupFeedbackModal(true);
      dispatch(setLogin(false));
      // navigate('/mainapp');
    } catch (error) {
      console.error('Signup Failed', error.response.data);
  
      // Corrected to use the intended state updater functions
      setSignupFeedbackMessage(`The signup was unsuccessful due to error: ${error.response.data}`);
      setShowSignupFeedbackModal(true);
    }
  };

  const handleLogout = () => {
    dispatch(setLogin(false));
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          src="https://objectstorage.us-ashburn-1.oraclecloud.com/p/dio1hxm2-zgEKO50TxR9bMNEgKS3IWfaLq-cGH-sOkdqUBX7RFb7eV39XoariPl8/n/idjegt7oebz2/b/CPCP/o/CP%20(500%20x%20300%20px).png"
          alt="Logo"
          width="200"
          height="75"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
        <div className="login-buttons">
          {isLoggedIn ? (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button className='loginbutton' variant="primary" onClick={() => setShowLoginModal(true)}>
                Login
              </Button>
              <Button variant="success" onClick={() => setShowSignupModal(true)}>
                Sign Up
              </Button>
            </>
          )}
        </div>
        <Modal show={showSignupFeedbackModal} onHide={() => setShowSignupFeedbackModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Signup Feedback</Modal.Title>
  </Modal.Header>
  <Modal.Body>{signupFeedbackMessage}</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowSignupFeedbackModal(false)}>
      Close
    </Button>
  </Modal.Footer>
</Modal>
      </Navbar.Collapse>
    
      <LandingModal
        showLoginModal={showLoginModal}
        handleLoginClose={() => setShowLoginModal(false)}
        showSignupModal={showSignupModal}
        handleSignupClose={() => setShowSignupModal(false)}
        loginFormData={loginFormData}
        handleLoginInputChange={handleLoginInputChange}
        handleLoginSubmit={handleLoginSubmit}
        signupFormData={signupFormData}
        handleSignupInputChange={handleSignupInputChange}
        handleSignupSubmit={handleSignupSubmit}
      />
      
    </Navbar>
  );
}

export default LandingNavbar;
