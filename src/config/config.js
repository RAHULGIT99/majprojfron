// Application configuration
const config = {
  api: {
    baseURL: process.env.REACT_APP_API_BASE_URL || 'https://majprojback-hdj8.onrender.com',
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT) || 30000,
  },
  app: {
    name: process.env.REACT_APP_NAME || 'Equity Research Tool',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.REACT_APP_ENVIRONMENT || 'development',
  },
  features: {
    analytics: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
    errorReporting: process.env.REACT_APP_ENABLE_ERROR_REPORTING === 'true',
  },
  security: {
    tokenRefreshInterval: parseInt(process.env.REACT_APP_TOKEN_REFRESH_INTERVAL) || 3600000,
    sessionTimeout: parseInt(process.env.REACT_APP_SESSION_TIMEOUT) || 7200000,
  },
  storage: {
    tokenKey: 'auth_token',
    userKey: 'user_data',
    refreshTokenKey: 'refresh_token',
  }
};

export default config;
