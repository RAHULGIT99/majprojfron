import config from '../config/config';
import { jwtDecode } from 'jwt-decode';

/**
 * Get authentication token from storage
 */
export const getToken = () => {
  try {
    return localStorage.getItem(config.storage.tokenKey);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

/**
 * Set authentication token in storage
 */
export const setToken = (token) => {
  try {
    localStorage.setItem(config.storage.tokenKey, token);
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

/**
 * Get user data from storage
 */
export const getUser = () => {
  try {
    const userData = localStorage.getItem(config.storage.userKey);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Set user data in storage
 */
export const setUser = (userData) => {
  try {
    localStorage.setItem(config.storage.userKey, JSON.stringify(userData));
  } catch (error) {
    console.error('Error setting user data:', error);
  }
};

/**
 * Clear all authentication data
 */
export const removeAuthData = () => {
  try {
    localStorage.removeItem(config.storage.tokenKey);
    localStorage.removeItem(config.storage.userKey);
    localStorage.removeItem(config.storage.refreshTokenKey);
  } catch (error) {
    console.error('Error removing auth data:', error);
  }
};

/**
 * Check if token is expired
 */
export const isTokenExpired = (token) => {
  try {
    if (!token) return true;
    
    const decoded = jwtDecode(token);
    
    if (!decoded.exp) return false;
    
    // Add 10 second buffer
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime + 10;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};

/**
 * Get token payload
 */
export const getTokenPayload = (token) => {
  try {
    return jwtDecode(token || getToken());
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Setup session timeout
 */
export const setupSessionTimeout = (callback) => {
  const timeout = config.security.sessionTimeout;
  
  let timeoutId;
  
  const resetTimer = () => {
    if (timeoutId) clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      removeAuthData();
      if (callback) callback();
    }, timeout);
  };
  
  // Reset timer on user activity
  const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
  events.forEach(event => {
    document.addEventListener(event, resetTimer);
  });
  
  resetTimer();
  
  // Return cleanup function
  return () => {
    if (timeoutId) clearTimeout(timeoutId);
    events.forEach(event => {
      document.removeEventListener(event, resetTimer);
    });
  };
};
