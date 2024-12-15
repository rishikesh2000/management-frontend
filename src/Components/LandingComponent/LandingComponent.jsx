import React, { useState } from 'react';
import './LandingComponent.css'; 
import hero from '../../Assests/hero.png';
import Login from '../Authentication/Login';
import Register from '../Authentication/Register';

const LandingComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const openRegister = () => {
    setShowRegister(true);
  };

  const closeRegister = () => {
    setShowRegister(false);
  };

  return (
    <div className="landing-container">
      {/* Navigation Bar */}
      <nav className="landing-navbar">
        <div className="navbar-logo">
          <img src={hero} alt="EmployeePro" />
        </div>
        <div className="navbar-links">
          <a className="login-link" onClick={openLogin}>Login</a>
          <a className="register-link" onClick={openRegister}>Register</a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="landing-content">
        <div className="content-wrapper">
          <h1>Revolutionize Your Workplace</h1>
          <p>
            Welcome to <strong>EmployeePro</strong>, where managing your workforce becomes a breeze. 
            From streamlined operations to empowering productivity, we’ve got you covered!
          </p>
          <p>Let’s take your team to the next level with tools that grow with your business.</p>
          <button onClick={openRegister}>Get Started</button>
        </div>

        {/* Hero Image */}
        <div className="hero-section">
          <img src={hero} alt="Hero" className="hero-image" />
        </div>
      </div>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2024 EmployeePro. All rights reserved. Designed for success.</p>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">

          <div className="modal">
          <span title="close" onClick={closeLogin}>x</span>

            <Login openRegister ={openRegister}
                  closeModal={closeLogin}
/>
          </div>
        </div>
      )}

      {/* Register Modal */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="modal">
          <span title="close" onClick={closeRegister}>x</span>
            <Register
             closeModal={closeRegister}
             openLogin={openLogin}
             
             />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingComponent;
