import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { authToken, user } = useContext(AuthContext);

  // If not authenticated, redirect to login
  if (!authToken || (requiredRole && user?.role !== requiredRole)) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components
  return children;
};

export default PrivateRoute;
