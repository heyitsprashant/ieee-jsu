import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEventBySlug } from '../services/api';
import Gallery from '../components/Gallery';
import Loading from '../components/Loading';
import '../styles/EventDetail.css';

const EventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await getEventBySlug(slug);
        setEvent(response.data);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!event) return <div className="alert alert-warning">Event not found</div>;

  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isPast = eventDate < today;

  return (
    <div className="event-detail-page">
      <div className="container py-5">
        <div className="event-header">
          <img 
            src={event.image || '/assets/default-event.jpg'} 
            alt={event.title} 
            className="event-detail-image"
          />
          <h1>{event.title}</h1>
          <div className="event-meta">
            <span>
              <i className="fas fa-calendar"></i> {eventDate.toLocaleDateString()}
            </span>
            <span>
              <i className="fas fa-map-marker-alt"></i> {event.location}
            </span>
          </div>
          {!isPast && event.registration_link && (
            <a 
              href={event.registration_link} 
              className="btn btn-primary btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register for Event
            </a>
          )}
        </div>

        <div className="event-content">
          {event.excerpt && (
            <div className="event-excerpt">
              <p className="lead">{event.excerpt}</p>
            </div>
          )}
          {event.content && (
            <div className="event-full-content" dangerouslySetInnerHTML={{ __html: event.content }}></div>
          )}
        </div>

        {event.has_gallery && event.gallery_items && event.gallery_items.length > 0 && (
          <div className="event-gallery-section">
            <Gallery items={event.gallery_items} />
          </div>
        )}

        <div className="event-actions">
          <a href="/events" className="btn btn-outline-primary">
            <i className="fas fa-arrow-left"></i> Back to Events
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
