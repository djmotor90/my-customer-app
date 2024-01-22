import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from './Navbar.js';

function Profile({ handleLogout }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false); // State to track edit mode
  const [updatedUserData, setUpdatedUserData] = useState({}); // State to track updated data

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

  const handleEditClick = () => {
    setIsEditMode(true);
    // Initialize updatedUserData with the current user data
    setUpdatedUserData(userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the updatedUserData state with the changes
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Reset updatedUserData to the current user data
    setUpdatedUserData(userData);
  };

  const handleSubmit = async () => {
    try {
      // Send a request to update the user data on the server
      await axios.put(`/api/users/${userId}`, updatedUserData);
      // Update the userData state with the updated data
      setUserData(updatedUserData);
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

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
      {isEditMode ? (
        <>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={updatedUserData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={updatedUserData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={updatedUserData.email}
              onChange={handleInputChange}
            />
          </div>
          <button onClick={handleSubmit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Profile;
