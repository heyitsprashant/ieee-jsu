import React, { useState, useEffect } from 'react';
import { getStudentOfficers, getMentors, getAboutSections, getPageBackground } from '../services/api';
import OfficerCard from '../components/OfficerCard';
import MentorCard from '../components/MentorCard';

const About = () => {
  const [officers, setOfficers] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [sections, setSections] = useState([]);
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [officersRes, mentorsRes, sectionsRes, bgRes] = await Promise.all([
          getStudentOfficers(),
          getMentors(),
          getAboutSections(),
          getPageBackground('about')
        ]);
        setOfficers(officersRes.data);
        setMentors(mentorsRes.data);
        setSections(sectionsRes.data);
        setBackground(bgRes.data);
      } catch (err) {
        setError('Error loading about page content');
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
    <div className="about-page">
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
          <div key={section._id} className="about-section mb-5">
            <h2>{section.title}</h2>
            <div className="row">
              <div className="col-md-8">
                <p>{section.content}</p>
                {section.button_text && section.button_url && (
                  <a href={section.button_url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    {section.button_text}
                  </a>
                )}
              </div>
              {section.image && (
                <div className="col-md-4">
                  <img src={section.image} alt={section.title} className="img-fluid rounded" />
                </div>
              )}
            </div>
          </div>
        ))}

        <section className="officers-section mb-5">
          <h2>Student Officers</h2>
          <div className="row">
            {officers.map((officer) => (
              <div key={officer._id} className="col-md-4 mb-4">
                <OfficerCard officer={officer} />
              </div>
            ))}
          </div>
        </section>

        <section className="mentors-section mb-5">
          <h2>Faculty Mentors</h2>
          <div className="row">
            {mentors.map((mentor) => (
              <div key={mentor._id} className="col-md-6 mb-4">
                <MentorCard mentor={mentor} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
