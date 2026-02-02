import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          IEEE JSU
        </Link>
        <button 
          className="mobile-menu-button" 
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className={`menu ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
          <Link to="/about" onClick={closeMobileMenu}>About</Link>
          <Link to="/events" onClick={closeMobileMenu}>Events</Link>
          <Link to="/blog" onClick={closeMobileMenu}>Blog</Link>
          <Link to="/members" onClick={closeMobileMenu}>Membership</Link>
          <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
