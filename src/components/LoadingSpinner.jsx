import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ 
  size = 'medium', 
  fullScreen = false, 
  message = 'Loading...',
  overlay = false 
}) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large',
  };

  const spinner = (
    <div className={`loading-spinner ${sizeClasses[size]}`}>
      <Loader2 className="spinner-icon" />
      {message && <p className="spinner-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`loading-fullscreen ${overlay ? 'with-overlay' : ''}`}>
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
