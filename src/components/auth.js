// auth.js (authentication service)
import axios from 'axios';
import { setLogin } from '../features/authSlice'; // Replace with the actual path

export const login = async (dispatch, credentials) => {
  try {
    const response = await axios.post('/api/auth/login', credentials, { withCredentials: true });
    dispatch(setLogin(true));
    return response.data;
  } catch (error) {
    dispatch(setLogin(false));
    throw error;
  }
};

export const logout = async (dispatch) => {
  try {
    await axios.post('/api/logout', {}, { withCredentials: true });
    dispatch(setLogin(false));
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Removed isAuthenticated function as its logic will be handled by Redux
