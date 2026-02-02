import React, { useState, useEffect } from 'react';
import { getPageBackground } from '../services/api';
import ContactForm from '../components/ContactForm';

const Contact = () => {
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bgRes = await getPageBackground('contact');
        setBackground(bgRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {background && (
        <div className="page-header" style={{ backgroundImage: `url(${background.background_image})` }}>
          <div className="overlay">
            <h1>{background.title}</h1>
            <p>{background.subtitle}</p>
          </div>
        </div>
      )}
      
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 mb-4">
            <h2>Get in Touch</h2>
            <p className="lead">
              Have questions about IEEE JSU? Want to join our student branch? 
              We'd love to hear from you!
            </p>
            
            <div className="contact-info mt-4">
              <div className="mb-3">
                <h5><i className="fas fa-map-marker-alt"></i> Location</h5>
                <p>Ayers Hall<br/>Jacksonville State University<br/>Jacksonville, AL</p>
              </div>
              
              <div className="mb-3">
                <h5><i className="fas fa-envelope"></i> Email</h5>
                <p><a href="mailto:ieee@jsu.edu">ieee@jsu.edu</a></p>
              </div>
              
              <div className="mb-3">
                <h5><i className="fab fa-instagram"></i> Social Media</h5>
                <p>
                  <a href="https://www.instagram.com/jsu.ieee/" target="_blank" rel="noopener noreferrer">
                    @jsu.ieee on Instagram
                  </a>
                </p>
              </div>
            </div>
          </div>
          
          <div className="col-md-6">
            <h2>Send Us a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
