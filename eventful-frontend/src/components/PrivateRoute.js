import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { authToken } = useContext(AuthContext);

  // If not authenticated, redirect to login
  if (!authToken) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components
  return children;
};

export default PrivateRoute;
