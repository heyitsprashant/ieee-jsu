import React, { useState, useEffect } from 'react';
import { getPageBackground } from '../services/api';
import Loading from '../components/Loading';
import '../styles/Members.css';

const Members = () => {
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBackground = async () => {
      try {
        const response = await getPageBackground('members');
        setBackground(response.data);
      } catch (err) {
        console.error('Error fetching background:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBackground();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="members-page">
      <header className="page-header">
        <div className="header-overlay">
          <img 
            src={background?.background_image || '/assets/jsu-anglehall.jpg'} 
            alt="Background" 
          />
        </div>
        <div className="header-content">
          <h1>{background?.title || 'Membership'}</h1>
          <p>{background?.subtitle || 'Join the IEEE JSU community'}</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <h2>Become a Member</h2>
              <p className="lead">
                Join the IEEE JSU Student Branch and become part of a vibrant community 
                of engineers and technology enthusiasts.
              </p>

              <h3>Benefits of Membership</h3>
              <ul className="benefits-list">
                <li>
                  <i className="fas fa-check-circle"></i>
                  Access to exclusive technical workshops and seminars
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Networking opportunities with industry professionals
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Discounts on IEEE conferences and publications
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Leadership and professional development opportunities
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Participation in exciting technical projects
                </li>
                <li>
                  <i className="fas fa-check-circle"></i>
                  Resume building and career guidance
                </li>
              </ul>

              <h3>How to Join</h3>
              <p>
                To become a member of IEEE JSU Student Branch, please follow these steps:
              </p>
              <ol>
                <li>Visit the <a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noopener noreferrer">IEEE Membership page</a></li>
                <li>Complete the membership application</li>
                <li>Select Jacksonville State University as your institution</li>
                <li>Contact us at <a href="mailto:ieee@jsu.edu">ieee@jsu.edu</a> to be added to our chapter</li>
              </ol>

              <div className="cta-section">
                <a 
                  href="https://www.ieee.org/membership/join/index.html" 
                  className="btn btn-primary btn-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join IEEE Now
                </a>
                <a href="/contact" className="btn btn-outline-primary btn-lg">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Members;
