import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const location = useLocation();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setRedirectPath('/login');
    } else if (isAdmin && location.pathname !== '/admin-dashboard') {
      setRedirectPath('/admin-dashboard');
    } else if (!isAdmin && location.pathname !== '/dashboard') {
      setRedirectPath(null);
    } else {
      setRedirectPath(null);
    }
  }, [isAuthenticated, isAdmin, location.pathname]);

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
