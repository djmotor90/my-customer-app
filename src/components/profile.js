import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from './Navbar.js';

function Profile({ handleLogout }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // You can retrieve the user ID from your authentication system
  // For example, if it's stored in localStorage:
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data based on the user's ID
        const response = await axios.get(`/api/users/${userId}`);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Add your update user information logic here

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (!userData) {
    return <p>User not found.</p>;
  }

  return (
    <div className="profile">
      <CustomNavbar userData={userData} handleLogout={handleLogout} />
      <h1>User Profile</h1>
      <p>First Name: {userData.firstName}</p>
      <p>Last Name: {userData.lastName}</p>
      <p>Email: {userData.email}</p>
      {/* Add your form for updating user information here */}
    </div>
  );
}

export default Profile;
