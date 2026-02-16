import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import './Toast.css';

const TOAST_TYPES = {
  success: { icon: CheckCircle, className: 'toast-success' },
  error: { icon: XCircle, className: 'toast-error' },
  warning: { icon: AlertCircle, className: 'toast-warning' },
  info: { icon: Info, className: 'toast-info' },
};

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
  const { icon: Icon, className } = TOAST_TYPES[type] || TOAST_TYPES.info;

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={`toast ${className}`} role="alert" aria-live="polite">
      <div className="toast-icon">
        <Icon size={20} />
      </div>
      <div className="toast-message">{message}</div>
      <button 
        className="toast-close" 
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
