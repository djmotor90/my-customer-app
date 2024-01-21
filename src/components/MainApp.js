import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from './auth.js';

function MainApp() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const userId = '65ac6f5ff8325c6e8a949ac5';
        const fetchUserDataResponse = await axios.get(`/api/users/${userId}`);

        setUserData(fetchUserDataResponse.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      logout();
      navigate('/'); // Redirect to the landing page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!isAuthenticated()) {
    // Redirect unauthenticated users to the landing page
    navigate('/');
    return null;
  }

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!userData) {
    return <p>User not found.</p>;
  }

  return (
    <div className="main-app">
      <div className="top-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h1>Welcome to the Main Application</h1>
      <h2>User Information</h2>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default MainApp;

