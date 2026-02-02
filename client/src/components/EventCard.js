import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
  const eventDate = new Date(event.date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const isPast = eventDate < today;

  return (
    <div className="event-card">
      <img 
        src={event.image || '/assets/default-event.jpg'} 
        alt={event.title} 
        className="event-card-image"
      />
      <div className="event-card-content">
        <h3>{event.title}</h3>
        <div className="event-info">
          <p>
            <i className="fas fa-calendar"></i> {eventDate.toLocaleDateString()}
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> {event.location}
          </p>
        </div>
        <p className="event-description">{event.description}</p>
        <div className="event-card-actions">
          <Link to={`/events/${event.slug}`} className="btn btn-primary">
            View Details
          </Link>
          {!isPast && event.registration_link && (
            <a 
              href={event.registration_link} 
              className="btn btn-outline-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
