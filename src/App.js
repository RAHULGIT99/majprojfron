import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './contexts/ToastContext';
import LoadingSpinner from './components/LoadingSpinner';
import { getToken, getUser, setToken, setUser, removeAuthData, isAuthenticated as checkAuth } from './utils/auth';
import logger from './utils/logger';
import './App.css';

// Lazy load components for code splitting
const Navbar = lazy(() => import('./components/Navbar'));
const Home = lazy(() => import('./components/Home'));
const Login = lazy(() => import('./components/Login'));
const Signup = lazy(() => import('./components/Signup'));
const VerifyOtp = lazy(() => import('./components/VerifyOtp'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const About = lazy(() => import('./components/About'));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUserState] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on initial load
  useEffect(() => {
    const initAuth = () => {
      try {
        const authenticated = checkAuth();
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const userData = getUser();
          if (userData) {
            setUserState(userData);
            logger.info('User authenticated:', userData.email || userData.username);
          }
        }
      } catch (error) {
        logger.error('Error initializing auth:', error);
        removeAuthData();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const handleLoginSuccess = (userData, token) => {
    setIsAuthenticated(true);
    setUserState(userData);
    setToken(token);
    setUser(userData);
    logger.info('Login successful:', userData.email || userData.username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserState(null);
    removeAuthData();
    logger.info('User logged out');
  };

  if (loading) {
    return <LoadingSpinner fullScreen message="Initializing application..." />;
  }

  return (
    <ErrorBoundary>
      <ToastProvider>
        <Router>
          <div className="App">
            <Suspense fallback={<LoadingSpinner fullScreen />}>
              <Navbar 
                isAuthenticated={isAuthenticated} 
                user={user} 
                onLogout={handleLogout} 
              />
              <Routes>
                <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
                <Route path="/about" element={<About />} />
                <Route 
                  path="/login" 
                  element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login onLoginSuccess={handleLoginSuccess} />} 
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify-otp" element={<VerifyOtp onLoginSuccess={handleLoginSuccess} />} />
                <Route 
                  path="/dashboard" 
                  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </Router>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;
