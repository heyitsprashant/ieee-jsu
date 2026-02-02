import React, { useState, useEffect } from 'react';
import { getEvents, getPageBackground } from '../services/api';
import EventCard from '../components/EventCard';
import Loading from '../components/Loading';
import '../styles/Events.css';

const Events = () => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, [currentPage]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const [activeRes, pastRes, bgRes] = await Promise.all([
        getEvents({ status: 'active' }),
        getEvents({ status: 'past', page: currentPage, limit: 8 }),
        getPageBackground('events').catch(() => ({ data: null }))
      ]);
      
      setActiveEvents(activeRes.data.events);
      setPastEvents(pastRes.data.events);
      setTotalPages(pastRes.data.totalPages);
      setBackground(bgRes.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && currentPage === 1) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="events-page">
      <header className="page-header">
        <div className="header-overlay">
          <img 
            src={background?.background_image || '/assets/jsu-anglehall.jpg'} 
            alt="Background" 
          />
        </div>
        <div className="header-content">
          <h1>{background?.title || 'Our Events'}</h1>
          <p>{background?.subtitle || 'Discover our upcoming and past events'}</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          {activeEvents && activeEvents.length > 0 && (
            <div className="active-events mb-5">
              <h2>Upcoming Events</h2>
              <div className="row">
                {activeEvents.map((event) => (
                  <div key={event._id} className="col-md-6 col-lg-4 mb-4">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {pastEvents && pastEvents.length > 0 && (
            <div className="past-events">
              <h2>Past Events</h2>
              <div className="row">
                {pastEvents.map((event) => (
                  <div key={event._id} className="col-md-6 col-lg-4 mb-4">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <nav aria-label="Events pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li 
                        key={index + 1} 
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;
