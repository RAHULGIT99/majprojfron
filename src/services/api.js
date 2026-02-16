import axios from 'axios';
import config from '../config/config';
import { getToken, removeAuthData, isTokenExpired } from '../utils/auth';
import logger from '../utils/logger';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: config.api.baseURL,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    
    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        logger.warn('Token expired, clearing auth data');
        removeAuthData();
        window.location.href = '/login';
        return Promise.reject(new Error('Token expired'));
      }
      
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      logger.debug('API Request:', {
        method: config.method,
        url: config.url,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => {
    logger.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      logger.debug('API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear auth and redirect to login
          logger.warn('Unauthorized access, redirecting to login');
          removeAuthData();
          if (window.location.pathname !== '/login') {
            window.location.href = '/login';
          }
          break;
          
        case 403:
          // Forbidden
          logger.warn('Access forbidden:', data);
          break;
          
        case 404:
          // Not found
          logger.warn('Resource not found:', error.config.url);
          break;
          
        case 429:
          // Rate limit exceeded
          logger.warn('Rate limit exceeded');
          break;
          
        case 500:
        case 502:
        case 503:
          // Server errors
          logger.error('Server error:', data);
          break;
          
        default:
          logger.error('API error:', { status, data });
      }
      
      // Enhance error message
      error.message = data?.detail || data?.message || error.message;
    } else if (error.request) {
      // Network error
      logger.error('Network error:', error);
      error.message = 'Network error. Please check your connection.';
    } else {
      logger.error('Unknown error:', error);
    }
    
    return Promise.reject(error);
  }
);

// API methods
export const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => apiClient.post('/login', credentials),
    signup: (userData) => apiClient.post('/signup', userData),
    verifyOtp: (data) => apiClient.post('/verify-otp', data),
    logout: () => apiClient.post('/logout'),
    refreshToken: () => apiClient.post('/refresh-token'),
  },
  
  // Analysis endpoints
  analysis: {
    analyze: (urls) => apiClient.post('/analyze', { urls }),
    getStatus: (indexName) => apiClient.get(`/analysis/status/${indexName}`),
  },
  
  // Chat endpoints
  chat: {
    ask: (indexName, question, history = []) => 
      apiClient.post('/ask', { index_name: indexName, question, history }),
    
    generateVisualization: (index, query, history = []) =>
      apiClient.post('/visuals', { index, query, history }),
    
    generateExcel: (index, query, history = []) =>
      apiClient.post('/excel', { index, query, history }),
  },
  
  // User endpoints
  user: {
    getProfile: () => apiClient.get('/user/profile'),
    updateProfile: (data) => apiClient.put('/user/profile', data),
  },
};

export default apiClient;
