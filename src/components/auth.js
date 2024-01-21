// auth.js (authentication service)
import axios from 'axios';

export const login = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    const token = response.data.token;
    // Store the token in local storage or a secure cookie
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  // Clear the token from local storage or cookie
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  // Check if the token exists in local storage or cookie
  return !!localStorage.getItem('token');
};
