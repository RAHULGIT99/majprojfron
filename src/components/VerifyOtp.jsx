import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import './Auth.css';

const VerifyOtp = ({ onLoginSuccess }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve email and password passed from Signup page
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (location.state && location.state.email && location.state.password) {
      setEmail(location.state.email);
      setPassword(location.state.password);
    } else {
      // If accessed directly without state, redirect to signup or show error
      setError("Session expired or invalid access. Please sign up again.");
    }
  }, [location.state]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Step 2: Verify with Email, OTP, AND Password (which we carried over)
      const response = await axios.post('https://majprojback-hdj8.onrender.com/verify-otp', {
        email,
        otp,
        password
      });

      const { token, user } = response.data;
      
      // Update parent state (App.js)
      if (onLoginSuccess) {
        onLoginSuccess(user, token);
      }

      navigate('/');
    } catch (err) {
        console.error("Verification failed", err);
        setError(err.response?.data?.detail || "Verification failed. Check your OTP and try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!email || !password) {
      return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="error-message">
                    <AlertCircle size={16} />
                    Missing registration details. Please <a href="/signup">Sign Up</a> again.
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
          <ShieldCheck size={40} style={{ color: 'var(--color-primary-500)', marginBottom: '8px' }} />
        </div>
        <h2 className="auth-title">Verify OTP</h2>
        <p className="auth-subtitle">Almost there! Verify your email to continue</p>
        
        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        
        <form onSubmit={handleVerify} className="auth-form">
            <div className="form-group">
                <p className="otp-info-text">
                    We've sent a verification code to <strong>{email}</strong>
                </p>
            </div>
            <div className="form-group">
                <label htmlFor="otp">Verification Code</label>
                <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the 6-digit code"
                required
                style={{ letterSpacing: '0.15em', textAlign: 'center', fontSize: 'var(--text-xl)' }}
                />
            </div>
            
            <button type="submit" className="auth-button" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="btn-spinner" />
                    Verifying...
                  </>
                ) : (
                  'Complete Registration'
                )}
            </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
