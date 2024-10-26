import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserState } from '../contexts/UserContext';
import { Spinner } from '../components/Spinner';

export const ProtectedRoute: React.FC = () => {
  const { isLoggedIn, userDetails } = useUserState();

  if (userDetails === null) {
    return <Spinner />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};
