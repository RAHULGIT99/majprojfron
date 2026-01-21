import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import VerifyOtp from './components/VerifyOtp';
import Dashboard from './components/Dashboard';
import About from './components/About';
import './App.css';


// Public Home Component
const Home = ({ isAuthenticated }) => {
    return (
        <div className="landing-container" style={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '80vh',
            textAlign: 'center'
        }}>
            <h1 style={{fontSize: '3rem', color: '#282c34', marginBottom: '1rem'}}>Equity Research Tool</h1>
            <p style={{fontSize: '1.2rem', color: '#555', marginBottom: '2rem'}}>
                Advanced analysis for your equity research needs.
            </p>
            {isAuthenticated ? (
                <div style={{display: 'flex', gap: '1rem'}}>
                     <Link to="/dashboard" style={{
                        padding: '10px 20px', 
                        backgroundColor: '#61dafb', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '5px',
                        fontWeight: 'bold'
                    }}>Go to Dashboard</Link>
                </div>
            ) : (
                <div style={{display: 'flex', gap: '1rem'}}>
                    <Link to="/login" style={{
                        padding: '10px 20px', 
                        backgroundColor: '#61dafb', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '5px',
                        fontWeight: 'bold'
                    }}>Login</Link>
                    <Link to="/signup" style={{
                        padding: '10px 20px', 
                        backgroundColor: '#282c34', 
                        color: 'white', 
                        textDecoration: 'none', 
                        borderRadius: '5px',
                        fontWeight: 'bold'
                    }}>Get Started</Link>
                </div>
            )}
        </div>
    );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token) {
      setIsAuthenticated(true);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          console.error("Invalid user data in local storage");
        }
      }
    }
    setLoading(false);
  }, []);

  const handleLoginSuccess = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          user={user} 
          onLogout={handleLogout} 
        />
        <Routes>
          <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/dashboard" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
          