import React from 'react'
import { Navigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';

const PrivateRoute = ({ children }) => {
   const user=  getCurrentUser();
   if (!user || user.role !== 'admin') {
    // If no user or user role is not admin, redirect to login
    return <Navigate to="/admin" />;
  }
  return children;
}

export default PrivateRoute