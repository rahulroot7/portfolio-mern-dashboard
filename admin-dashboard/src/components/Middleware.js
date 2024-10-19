import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const Middleware = () => {
  // Example: Check if token is present and not expired
  const token = localStorage.getItem('token');
  const tokenExpiry = localStorage.getItem('tokenExpiry');

  const isAuthenticated = token && tokenExpiry && Date.now() < tokenExpiry;

  if (!isAuthenticated) {
    toast.error("Session expired or unauthorized access, please log in.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default Middleware;
