import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="event-card">
      <div className="event-image">
        <img src={event.image} alt={event.title} />
      </div>
      <div className="event-info">
        <h3>{event.title}</h3>
        <p className="event-date">
          <i className="fas fa-calendar"></i> {formatDate(event.date)}
        </p>
        <p className="event-location">
          <i className="fas fa-map-marker-alt"></i> {event.location}
        </p>
        <p className="event-description">{event.description}</p>
        <Link to={`/events/${event.slug}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
