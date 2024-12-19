import React from 'react';
import { Navigate } from 'react-router-dom'; // If you're using react-router-dom v6
import { isAuthenticated } from '../services/authService'; // Import your authentication check function

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  // If authenticated, render the requested child component
  return children;
};

export default ProtectedRoute;
