import React from 'react';
import '../styles/OfficerCard.css';

const OfficerCard = ({ officer, isMentor = false }) => {
  return (
    <div className="officer-card">
      <img 
        src={officer.image || '/assets/default-profile.jpg'} 
        alt={officer.name} 
        className="officer-image"
      />
      <div className="officer-info">
        <h4>{officer.name}</h4>
        <p className="officer-position">{officer.position}</p>
        {isMentor && officer.expertise && (
          <p className="officer-expertise">{officer.expertise}</p>
        )}
        {isMentor && officer.bio && (
          <p className="officer-bio">{officer.bio}</p>
        )}
        <div className="officer-links">
          {officer.email && (
            <a href={`mailto:${officer.email}`} title="Email">
              <i className="fas fa-envelope"></i>
            </a>
          )}
          {officer.linkedin && (
            <a 
              href={officer.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {officer.github && (
            <a 
              href={officer.github} 
              target="_blank" 
              rel="noopener noreferrer"
              title="GitHub"
            >
              <i className="fab fa-github"></i>
            </a>
          )}
          {isMentor && officer.google_scholar && (
            <a 
              href={officer.google_scholar} 
              target="_blank" 
              rel="noopener noreferrer"
              title="Google Scholar"
            >
              <i className="fas fa-graduation-cap"></i>
            </a>
          )}
          {isMentor && officer.personal_website && (
            <a 
              href={officer.personal_website} 
              target="_blank" 
              rel="noopener noreferrer"
              title="Personal Website"
            >
              <i className="fas fa-globe"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficerCard;
