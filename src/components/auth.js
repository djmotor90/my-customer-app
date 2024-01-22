// auth.js (authentication service)
import axios from 'axios';

export const login = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/login', credentials, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post('/api/logout', {}, { withCredentials: true });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

export const isAuthenticated = () => {
  return document.cookie.split(';').some((item) => item.trim().startsWith('token='));
};

