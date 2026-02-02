import React from 'react';

const MentorCard = ({ mentor }) => {
  return (
    <div className="mentor-card">
      <div className="mentor-image">
        <img src={mentor.image} alt={mentor.name} />
      </div>
      <div className="mentor-info">
        <h3>{mentor.name}</h3>
        <p className="position">{mentor.position}</p>
        <p className="expertise"><strong>Expertise:</strong> {mentor.expertise}</p>
        <p className="bio">{mentor.bio}</p>
        <div className="social-links">
          {mentor.linkedin && (
            <a href={mentor.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fab fa-linkedin"></i>
            </a>
          )}
          {mentor.github && (
            <a href={mentor.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
          )}
          {mentor.email && (
            <a href={`mailto:${mentor.email}`} aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
          )}
          {mentor.google_scholar && (
            <a href={mentor.google_scholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar">
              <i className="fas fa-graduation-cap"></i>
            </a>
          )}
          {mentor.personal_website && (
            <a href={mentor.personal_website} target="_blank" rel="noopener noreferrer" aria-label="Website">
              <i className="fas fa-globe"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
