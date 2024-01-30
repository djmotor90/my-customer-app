//MainApp.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CustomNavbar from '../navbar/Navbar.js';
import { setUserData, setLoading } from '../features/userSlice'; // Import actions from userSlice

function MainApp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId); // Get userId from Redux store
  const userData = useSelector((state) => state.user.userData);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    if (isLoggedIn && userId) {
      // Fetch user data if logged in and userId is available
      const fetchUserData = async () => {
        try {
          dispatch(setLoading(true));
          const response = await axios.get(`/api/users/${userId}`); // Use userId in API call
          dispatch(setUserData(response.data));
          dispatch(setLoading(false));
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(setLoading(false));
        }
      };
      fetchUserData();
    }
  }, [isLoggedIn, userId, dispatch, navigate]);

  return (
    <div className="main-app">
      <CustomNavbar />
      <h1>Welcome to the Main Application</h1>
      <h2>User Information</h2>
      {loading ? (
        <p>Loading user data...</p>
      ) : userData ? (
        <>
          <p>First Name: {userData.firstName}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
        </>
      ) : (
        <p>User data not available.</p>
      )}
    </div>
  );
}

export default MainApp;

