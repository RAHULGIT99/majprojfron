import { useState, useEffect } from 'react';
import { isAuthenticated as checkAuth, setupSessionTimeout } from '../utils/auth';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(checkAuth());

  useEffect(() => {
    const cleanup = setupSessionTimeout(() => {
      setIsAuthenticated(false);
      window.location.href = '/login';
    });

    return cleanup;
  }, []);

  return { isAuthenticated, setIsAuthenticated };
};
