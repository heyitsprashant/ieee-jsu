import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      };
      const dateTimeString = now.toLocaleDateString('en-US', options);
      setCurrentDateTime(dateTimeString);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="main-footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>About IEEE JSU</h3>
          <p>
            The IEEE JSU Student Branch is dedicated to promoting excellence in 
            the field of electrical and electronics engineering at Jacksonville 
            State University.
          </p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/members">Membership</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <p>
            <i className="fas fa-map-marker-alt"></i> Ayers Hall, Jacksonville State University, AL
          </p>
          <p>
            <i className="fas fa-envelope"></i> ieee@jsu.edu
          </p>
          <div className="social-links">
            <a 
              href="https://www.instagram.com/jsu.ieee/" 
              className="social-link" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} IEEE JSU Student Branch. All rights reserved. | {' '}
          <a href="https://www.ieee.org/" target="_blank" rel="noopener noreferrer">
            IEEE.org
          </a> | <strong>Made by Prashant</strong>
        </p>
        <p>{currentDateTime}</p>
      </div>
    </footer>
  );
};

export default Footer;
