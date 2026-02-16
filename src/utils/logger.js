import config from '../config/config';

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const currentLevel = config.app.environment === 'production' 
  ? LOG_LEVELS.WARN 
  : LOG_LEVELS.DEBUG;

const logger = {
  debug: (...args) => {
    if (currentLevel <= LOG_LEVELS.DEBUG) {
      console.log('[DEBUG]', new Date().toISOString(), ...args);
    }
  },
  
  info: (...args) => {
    if (currentLevel <= LOG_LEVELS.INFO) {
      console.info('[INFO]', new Date().toISOString(), ...args);
    }
  },
  
  warn: (...args) => {
    if (currentLevel <= LOG_LEVELS.WARN) {
      console.warn('[WARN]', new Date().toISOString(), ...args);
    }
  },
  
  error: (...args) => {
    if (currentLevel <= LOG_LEVELS.ERROR) {
      console.error('[ERROR]', new Date().toISOString(), ...args);
    }
    
    // Send to error reporting service in production
    if (config.features.errorReporting) {
      // TODO: Integrate with Sentry, LogRocket, etc.
      // Example: Sentry.captureException(args[0]);
    }
  },
};

export default logger;
