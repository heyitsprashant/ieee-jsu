import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/BlogCard.css';

const BlogCard = ({ post }) => {
  const postDate = new Date(post.createdAt);

  return (
    <div className="blog-card">
      {post.image && (
        <img 
          src={post.image} 
          alt={post.title} 
          className="blog-card-image"
        />
      )}
      <div className="blog-card-content">
        <h3>{post.title}</h3>
        <div className="blog-meta">
          <span><i className="fas fa-user"></i> {post.author}</span>
          <span><i className="fas fa-calendar"></i> {postDate.toLocaleDateString()}</span>
        </div>
        <p className="blog-excerpt">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="btn btn-primary">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
