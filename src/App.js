// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import MainApp from './components/MainApp.js';
import { isAuthenticated } from './components/auth.js'; // Import the isAuthenticated function

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/mainapp"
          element={isAuthenticated() ? <MainApp /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

