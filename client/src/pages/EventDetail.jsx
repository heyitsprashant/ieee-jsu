import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../services/api';

const EventDetail = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEvent(slug);
        setEvent(response.data);
      } catch (err) {
        setError('Event not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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

  if (error || !event) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error || 'Event not found'}</div>
      </div>
    );
  }

  return (
    <div className="event-detail-page">
      <div className="container mt-5">
        <div className="event-header mb-4">
          <img src={event.image} alt={event.title} className="img-fluid rounded mb-3" />
          <h1>{event.title}</h1>
          <p className="event-meta">
            <span><i className="fas fa-calendar"></i> {formatDate(event.date)}</span>
            <span className="mx-3"><i className="fas fa-map-marker-alt"></i> {event.location}</span>
          </p>
        </div>

        {event.excerpt && (
          <div className="event-excerpt mb-4">
            <p className="lead">{event.excerpt}</p>
          </div>
        )}

        {event.content && (
          <div className="event-content mb-4">
            <p style={{ whiteSpace: 'pre-wrap' }}>{event.content}</p>
          </div>
        )}

        {event.registration_link && (
          <div className="mb-4">
            <a href={event.registration_link} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              Register for Event
            </a>
          </div>
        )}

        {event.has_gallery && event.gallery_items && event.gallery_items.length > 0 && (
          <div className="event-gallery mt-5">
            <h2>Event Gallery</h2>
            <div className="row">
              {event.gallery_items.map((item, index) => (
                <div key={index} className="col-md-4 mb-3">
                  {item.media_type === 'image' && item.image && (
                    <div className="gallery-item">
                      <img src={item.image} alt={item.caption} className="img-fluid rounded" />
                      {item.caption && <p className="text-center mt-2">{item.caption}</p>}
                    </div>
                  )}
                  {item.media_type === 'video' && item.video_url && (
                    <div className="gallery-item">
                      <div className="ratio ratio-16x9">
                        <iframe
                          src={item.video_url.replace('watch?v=', 'embed/')}
                          title={item.caption}
                          allowFullScreen
                        ></iframe>
                      </div>
                      {item.caption && <p className="text-center mt-2">{item.caption}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
