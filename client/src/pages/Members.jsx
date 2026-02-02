import React, { useState, useEffect } from 'react';
import { getPageBackground } from '../services/api';

const Members = () => {
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bgRes = await getPageBackground('members');
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
    <div className="members-page">
      {background && (
        <div className="page-header" style={{ backgroundImage: `url(${background.background_image})` }}>
          <div className="overlay">
            <h1>{background.title}</h1>
            <p>{background.subtitle}</p>
          </div>
        </div>
      )}
      
      <div className="container mt-5">
        <section className="membership-info mb-5">
          <h2>Join IEEE JSU Student Branch</h2>
          <p className="lead">
            Become a member of the IEEE JSU Student Branch and unlock a world of opportunities 
            in engineering and technology.
          </p>
          
          <div className="row mt-4">
            <div className="col-md-6 mb-4">
              <div className="benefit-card">
                <i className="fas fa-users fa-3x mb-3 text-primary"></i>
                <h3>Networking</h3>
                <p>Connect with fellow students, faculty, and industry professionals in the field of electrical and electronics engineering.</p>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="benefit-card">
                <i className="fas fa-laptop-code fa-3x mb-3 text-primary"></i>
                <h3>Hands-on Experience</h3>
                <p>Participate in workshops, projects, and competitions that provide practical experience and skill development.</p>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="benefit-card">
                <i className="fas fa-book fa-3x mb-3 text-primary"></i>
                <h3>Learning Resources</h3>
                <p>Access to IEEE publications, journals, and educational materials to enhance your knowledge.</p>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="benefit-card">
                <i className="fas fa-certificate fa-3x mb-3 text-primary"></i>
                <h3>Professional Development</h3>
                <p>Attend seminars, guest lectures, and industry visits to prepare for your professional career.</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <h3>How to Join</h3>
            <ol className="join-steps">
              <li>Be a student at Jacksonville State University</li>
              <li>Have an interest in electrical engineering, computer engineering, or related fields</li>
              <li>Contact us through our contact page or attend one of our meetings</li>
              <li>Fill out the membership form and pay the annual dues</li>
            </ol>
            <a href="/contact" className="btn btn-primary btn-lg mt-3">
              Contact Us to Join
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Members;
