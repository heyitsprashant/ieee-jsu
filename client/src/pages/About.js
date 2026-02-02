import React, { useState, useEffect } from 'react';
import { getOfficers, getMentors, getAboutSections, getPageBackground } from '../services/api';
import OfficerCard from '../components/OfficerCard';
import Loading from '../components/Loading';
import '../styles/About.css';

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
        setLoading(true);
        const [officersRes, mentorsRes, sectionsRes, bgRes] = await Promise.all([
          getOfficers(),
          getMentors(),
          getAboutSections(),
          getPageBackground('about').catch(() => ({ data: null }))
        ]);
        
        setOfficers(officersRes.data);
        setMentors(mentorsRes.data);
        setSections(sectionsRes.data);
        setBackground(bgRes.data);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError('Failed to load page data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="about-page">
      <header className="page-header">
        <div className="header-overlay">
          <img 
            src={background?.background_image || '/assets/jsu-anglehall.jpg'} 
            alt="Background" 
          />
        </div>
        <div className="header-content">
          <h1>{background?.title || 'About Us'}</h1>
          <p>{background?.subtitle || 'Learn more about our organization'}</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          {sections && sections.length > 0 && sections.map((section, index) => (
            <div key={section._id || index} className="about-section-content mb-5">
              <h2>{section.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: section.content }}></div>
              {section.image && (
                <img 
                  src={section.image} 
                  alt={section.title} 
                  className="img-fluid rounded shadow my-4"
                />
              )}
              {section.button_text && section.button_url && (
                <a 
                  href={section.button_url} 
                  className="btn btn-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {section.button_text}
                </a>
              )}
            </div>
          ))}

          {officers && officers.length > 0 && (
            <div className="officers-section mb-5">
              <h2>Student Officers</h2>
              <div className="row">
                {officers.map((officer) => (
                  <div key={officer._id} className="col-md-6 col-lg-4 mb-4">
                    <OfficerCard officer={officer} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {mentors && mentors.length > 0 && (
            <div className="mentors-section">
              <h2>Our Mentors</h2>
              <div className="row">
                {mentors.map((mentor) => (
                  <div key={mentor._id} className="col-md-6 col-lg-4 mb-4">
                    <OfficerCard officer={mentor} isMentor={true} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default About;
