import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="blog-card">
      {post.image && (
        <div className="blog-image">
          <img src={post.image} alt={post.title} />
        </div>
      )}
      <div className="blog-info">
        <h3>{post.title}</h3>
        <p className="blog-meta">
          <span><i className="fas fa-user"></i> {post.author}</span>
          <span><i className="fas fa-calendar"></i> {formatDate(post.createdAt)}</span>
        </p>
        <p className="blog-excerpt">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
