// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import MainApp from './components/MainApp.js';
import PrivateRoute from './components/PrivateRoute.js';
import Profile from './components/profile.js';
import CustomNavbar from './components/Navbar.js';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/mainapp/*" element={<CustomNavbar />} />
      <Route path="/mainapp" element={<PrivateRoute element={<MainApp />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
    </Routes>
  );
}

export default App;
