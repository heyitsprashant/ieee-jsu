import React, { useState, useEffect } from 'react';
import { getHomeSections, getPageBackground } from '../services/api';

const Home = () => {
  const [sections, setSections] = useState([]);
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sectionsRes, bgRes] = await Promise.all([
          getHomeSections(),
          getPageBackground('home')
        ]);
        setSections(sectionsRes.data);
        setBackground(bgRes.data);
      } catch (err) {
        setError('Error loading home page content');
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
    <div className="home-page">
      {background && (
        <div className="page-header" style={{ backgroundImage: `url(${background.background_image})` }}>
          <div className="overlay">
            <h1>{background.title}</h1>
            <p>{background.subtitle}</p>
          </div>
        </div>
      )}
      
      <div className="container mt-5">
        {error && <div className="alert alert-danger">{error}</div>}
        
        {sections.map((section) => (
          <div key={section._id} className="home-section mb-5">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2>{section.title}</h2>
                <p>{section.description}</p>
              </div>
              {section.image && (
                <div className="col-md-6">
                  <img src={section.image} alt={section.title} className="img-fluid rounded" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
