import React, { useState, useEffect } from 'react';
import { getEvents, getPageBackground } from '../services/api';
import EventCard from '../components/EventCard';

const Events = () => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pastPage, setPastPage] = useState(1);
  const [totalPastPages, setTotalPastPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activeRes, pastRes, bgRes] = await Promise.all([
          getEvents('active'),
          getEvents('past', pastPage, 8),
          getPageBackground('events')
        ]);
        
        setActiveEvents(activeRes.data.events || activeRes.data);
        setPastEvents(pastRes.data.events || pastRes.data);
        setTotalPastPages(pastRes.data.pages || 1);
        setBackground(bgRes.data);
      } catch (err) {
        setError('Error loading events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pastPage]);

  const handlePageChange = (newPage) => {
    setPastPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <div className="events-page">
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
        
        {activeEvents.length > 0 && (
          <section className="active-events mb-5">
            <h2>Upcoming Events</h2>
            <div className="row">
              {activeEvents.map((event) => (
                <div key={event._id} className="col-md-6 mb-4">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </section>
        )}

        {pastEvents.length > 0 && (
          <section className="past-events mb-5">
            <h2>Past Events</h2>
            <div className="row">
              {pastEvents.map((event) => (
                <div key={event._id} className="col-md-6 mb-4">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
            
            {totalPastPages > 1 && (
              <nav aria-label="Page navigation">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${pastPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(pastPage - 1)}
                      disabled={pastPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  {[...Array(totalPastPages)].map((_, i) => (
                    <li key={i + 1} className={`page-item ${pastPage === i + 1 ? 'active' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${pastPage === totalPastPages ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => handlePageChange(pastPage + 1)}
                      disabled={pastPage === totalPastPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </section>
        )}
      </div>
    </div>
  );
};

export default Events;
