import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        EquityResearch
      </Link>
      
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
        <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
        
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}>Dashboard</Link>
            <div className="nav-divider" />
            <span className="nav-link welcome-text">
              {user?.username}
            </span>
            <button onClick={handleLogout} className="nav-button logout-btn">
              <LogOut size={14} />
              Logout
            </button>
          </>
        ) : (
          <>
            <div className="nav-divider" />
            <Link to="/login" className="nav-button">Login</Link>
            <Link to="/signup" className="nav-button signup-btn">Get Started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
