import { isAuthenticated } from '@/utils/auth';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// import { isAuthenticated } from '../utils/auth'; // Adjust the import path as needed

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that redirects to the sign-in page
 * if the user is not authenticated
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to the sign-in page with the return url
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;