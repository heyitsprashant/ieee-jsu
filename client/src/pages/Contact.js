import React, { useState, useEffect } from 'react';
import { submitContact, getPageBackground } from '../services/api';
import Loading from '../components/Loading';
import '../styles/Contact.css';

const Contact = () => {
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('success');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const response = await getPageBackground('contact');
        setBackground(response.data);
      } catch (err) {
        console.error('Error fetching background:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBackground();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.first_name || !formData.last_name || !formData.email || 
        !formData.subject || !formData.message) {
      setMessage('Please fill in all fields.');
      setMessageType('danger');
      return;
    }

    try {
      setSubmitting(true);
      const response = await submitContact(formData);
      setMessage(response.data.message);
      setMessageType('success');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setMessage('Failed to submit form. Please try again.');
      setMessageType('danger');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="contact-page">
      <header className="page-header">
        <div className="header-overlay">
          <img 
            src={background?.background_image || '/assets/jsu-anglehall.jpg'} 
            alt="Background" 
          />
        </div>
        <div className="header-content">
          <h1>{background?.title || 'Contact Us'}</h1>
          <p>{background?.subtitle || 'Get in touch with us'}</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {message && (
                <div className={`alert alert-${messageType}`} role="alert">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="first_name" className="form-label">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="last_name" className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
