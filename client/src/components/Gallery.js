import React from 'react';
import '../styles/Gallery.css';

const Gallery = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="gallery">
      <h3>Event Gallery</h3>
      <div className="gallery-grid">
        {items.map((item, index) => (
          <div key={index} className="gallery-item">
            {item.media_type === 'image' && item.image && (
              <img 
                src={item.image} 
                alt={item.caption || `Gallery item ${index + 1}`} 
                className="gallery-image"
              />
            )}
            {item.media_type === 'video' && item.video_url && (
              <div className="gallery-video">
                <iframe
                  src={item.video_url}
                  title={item.caption || `Video ${index + 1}`}
                  allowFullScreen
                ></iframe>
              </div>
            )}
            {item.caption && (
              <p className="gallery-caption">{item.caption}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
