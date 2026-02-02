import React, { useState, useEffect } from 'react';
import { getHomeInfo, getPageBackground } from '../services/api';
import Loading from '../components/Loading';
import '../styles/Home.css';

const Home = () => {
  const [background, setBackground] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bgResponse, sectionsResponse] = await Promise.all([
          getPageBackground('home').catch(() => ({ data: null })),
          getHomeInfo()
        ]);
        
        setBackground(bgResponse.data);
        setSections(sectionsResponse.data);
      } catch (err) {
        console.error('Error fetching home data:', err);
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
    <div className="home-page">
      <header className="website-background-home">
        <div className="website-background-overlay-image">
          <img 
            src={background?.background_image || '/assets/jsu-anglehall.jpg'} 
            alt="Background" 
          />
        </div>
        <div className="website-background-content">
          <div className="content-wrapper">
            <h1>{background?.title || 'Welcome to IEEE'}</h1>
            <p>{background?.subtitle || 'Advancing Technology for Humanity'}</p>
            <div className="button-group">
              <a href="/about" className="website-background-button">Learn More</a>
              <a href="/members" className="website-background-button">Become a Member</a>
              <a href="/events" className="website-background-button">View Events</a>
            </div>
          </div>
        </div>
      </header>

      {sections && sections.length > 0 && (
        <section className="about-section py-5">
          <div className="container">
            {sections.map((section, index) => (
              <div key={section._id || index}>
                {section.section_type === 'media_only' ? (
                  <div className="media-only-section mb-5 scroll-animation">
                    <div className="row justify-content-center">
                      <div className="col-12">
                        <div className="about-media">
                          {section.media_type === 'image' && section.image && (
                            <img 
                              src={section.image} 
                              alt={section.title} 
                              className="img-fluid rounded shadow"
                            />
                          )}
                          {section.media_type === 'video' && section.video && (
                            <video controls className="w-100 rounded shadow">
                              <source src={section.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          {section.media_type === 'video_link' && section.video_link && (
                            <div className="ratio ratio-16x9">
                              <iframe 
                                src={section.video_link} 
                                allowFullScreen 
                                className="rounded shadow"
                                title={section.title}
                              ></iframe>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`about-item ${index % 2 !== 0 ? 'about-item-reverse' : ''} mb-5`}>
                    <div className="row align-items-center g-4">
                      {index === 0 && section.is_homepage_feature ? (
                        <>
                          <div className="col-12 mb-4">
                            <div className="about-content text-center scroll-animation-fade">
                              <h3 className="mb-4" dangerouslySetInnerHTML={{ __html: section.title }}></h3>
                              {section.description && (
                                <div 
                                  className="about-description" 
                                  dangerouslySetInnerHTML={{ __html: section.description }}
                                ></div>
                              )}
                            </div>
                          </div>
                          <div className="col-12 mb-4">
                            <div className="about-media scroll-animation">
                              {section.media_type === 'image' && section.image && (
                                <img 
                                  src={section.image} 
                                  alt={section.title} 
                                  className="img-fluid rounded shadow"
                                />
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-2' : ''}`}>
                            <div className={`about-content ${index % 2 !== 0 ? 'scroll-animation-right' : 'scroll-animation-left'}`}>
                              <h3 className="mb-4" dangerouslySetInnerHTML={{ __html: section.title }}></h3>
                              {section.description && (
                                <div 
                                  className="about-description" 
                                  dangerouslySetInnerHTML={{ __html: section.description }}
                                ></div>
                              )}
                            </div>
                          </div>
                          <div className={`col-lg-6 ${index % 2 !== 0 ? 'order-lg-1' : ''}`}>
                            <div className={`about-media ${index % 2 !== 0 ? 'scroll-animation-left' : 'scroll-animation-right'}`}>
                              {section.media_type === 'image' && section.image && (
                                <img 
                                  src={section.image} 
                                  alt={section.title} 
                                  className="img-fluid rounded shadow"
                                />
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
