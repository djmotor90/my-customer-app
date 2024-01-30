// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute({ element }) {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  console.log('PrivateRoute', isLoggedIn);
  return (
    isLoggedIn ? element : <Navigate to="/" replace />
  );
}

export default PrivateRoute;
