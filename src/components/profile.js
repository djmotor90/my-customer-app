import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomNavbar from './Navbar.js';
import { useSelector, useDispatch } from 'react-redux';
import { setUserData } from '../features/userSlice'; // Import setUserData action

function Profile() {
  const userId = useSelector((state) => state.auth.userId); // Retrieve user ID from Redux store
  const userData = useSelector((state) => state.user.userData); // Retrieve user data from Redux store
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState(userData || {});
  const dispatch = useDispatch(); // Add useDispatch
  const token = useSelector((state) => state.auth.token); // Retrieve token from Redux store


  useEffect(() => {
    console.log('Token from Redux:', token);
    if (userData) {
      setUpdatedUserData(userData);
    }
  }, [userData]);

  const handleEditClick = () => {
    setIsEditMode(true);
    setUpdatedUserData(userData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({ ...updatedUserData, [name]: value });
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setUpdatedUserData(userData);
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${token}` // Corrected to use template literals
        }
      };
  
      const response = await axios.put(`/api/users/${userId}`, updatedUserData, config);
      setIsEditMode(false);
      dispatch(setUserData(response.data)); // Update userData in Redux store with the response data
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };
  return (
    <div className="profile">
      <CustomNavbar />
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
