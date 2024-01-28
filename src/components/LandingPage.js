// LandingPage.js
import React, { useState } from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserId, setToken } from '../features/authSlice'; // Adjust the import path
import LandingModal from '../modal/LandingModal'; // Import LandingModal
import '../css/LandingPage.css'; // Import your custom CSS
import LandingInserter from '../inserters/LandingInserter'; // Adjust the import path

function LandingPage() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ email: '', password: '' });
  const [signupFormData, setSignupFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });

  // // const handleLoginClose = () => setShowLoginModal(false);
  // const handleLoginShow = () => setShowLoginModal(true);
  // // const handleSignupClose = () => setShowSignupModal(false);
  // const handleSignupShow = () => setShowSignupModal(true);

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
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">My App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact</Nav.Link>
          </Nav>
          <div className="login-buttons"> {/* Login Buttons */}
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
        </Navbar.Collapse>
      </Navbar>
              {/* Insert the LandingInserter component here */}
              <LandingInserter />

      {/* Render LandingModal */}
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
    </div>
  );
}

export default LandingPage;