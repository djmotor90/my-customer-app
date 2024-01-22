// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import MainApp from './components/MainApp.js';
import PrivateRoute from './components/PrivateRoute.js';
import Profile from './components/profile.js'; // Import the Profile component
import CustomNavbar from './components/Navbar.js'; // Import your Navbar component

function App() {
  // Read isLoggedIn state from localStorage on component mount
  const initialIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn); // State to track login status

  useEffect(() => {
    // Update localStorage whenever isLoggedIn changes
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} />} />
        {/* Include your Navbar component conditionally */}
        {isLoggedIn && <Route path="/mainapp/*" element={<CustomNavbar />} />}
        <Route path="/mainapp" element={<PrivateRoute element={<MainApp />} isLoggedIn={isLoggedIn} />} />
        <Route path="/profile" element={<PrivateRoute element={<Profile />} isLoggedIn={isLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
