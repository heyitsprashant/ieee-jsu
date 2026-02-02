import React from 'react';

const OfficerCard = ({ officer }) => {
  return (
    <div className="officer-card">
      <div className="officer-image">
        <img src={officer.image} alt={officer.name} />
      </div>
      <div className="officer-info">
        <h3>{officer.name}</h3>
        <p className="position">{officer.position}</p>
        <div className="social-links">
          {officer.linkedin && (
            <a href={officer.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {officer.github && (
            <a href={officer.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          )}
          {officer.email && (
            <a href={`mailto:${officer.email}`} aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default OfficerCard;
