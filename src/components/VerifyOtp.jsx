import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:8000/verify-otp', {
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
                    Missing registration details. Please <a href="/signup">Sign Up</a> again.
                </div>
            </div>
        </div>
      );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Verify OTP</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleVerify} className="auth-form">
            <div className="form-group">
                <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '1rem'}}>
                    We've sent an OTP to <strong>{email}</strong>
                </p>
            </div>
            <div className="form-group">
                <label htmlFor="otp">Enter OTP</label>
                <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the 6-digit OTP"
                required
                />
            </div>
            
            <button type="submit" className="auth-button" disabled={isSubmitting}>
                {isSubmitting ? 'Verifying...' : 'Complete Registration'}
            </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
