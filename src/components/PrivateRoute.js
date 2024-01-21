import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth.js'; // Import isAuthenticated

function PrivateRoute({ element: Component, ...rest }) {
  return (
    <Route
      {...rest}
      element={isAuthenticated() ? <Component /> : <Navigate to="/" />}
    />
  );
}

export default PrivateRoute;
