import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// const PublicRoute = ({ children }) => {
//   const { isLoggedIn } = useAuth();
//   return !isLoggedIn ? children : <Navigate to="/profile" />;
// };

export { PrivateRoute };
