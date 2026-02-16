/**
 * Email validation
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 * Requirements: At least 8 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const validatePassword = (password) => {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long' };
  }
  
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one uppercase letter' };
  }
  
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least one lowercase letter' };
  }
  
  if (!/\d/.test(password)) {
    return { valid: false, message: 'Password must contain at least one number' };
  }
  
  return { valid: true, message: '' };
};

/**
 * URL validation
 */
export const validateURL = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Username validation
 * Requirements: 3-20 characters, alphanumeric and underscores only
 */
export const validateUsername = (username) => {
  if (username.length < 3 || username.length > 20) {
    return { valid: false, message: 'Username must be 3-20 characters long' };
  }
  
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, message: 'Username can only contain letters, numbers, and underscores' };
  }
  
  return { valid: true, message: '' };
};

/**
 * OTP validation
 */
export const validateOTP = (otp) => {
  return /^\d{6}$/.test(otp);
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input) => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Validate multiple URLs
 */
export const validateURLs = (urls) => {
  const errors = [];
  const validUrls = [];
  
  urls.forEach((url, index) => {
    const trimmedUrl = url.trim();
    if (trimmedUrl) {
      if (validateURL(trimmedUrl)) {
        validUrls.push(trimmedUrl);
      } else {
        errors.push(`URL ${index + 1} is invalid: ${trimmedUrl}`);
      }
    }
  });
  
  return { valid: errors.length === 0, errors, validUrls };
};
