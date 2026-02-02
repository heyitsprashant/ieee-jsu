import React, { useState, useEffect } from 'react';
import { getBlogPosts, getPageBackground } from '../services/api';
import BlogCard from '../components/BlogCard';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, bgRes] = await Promise.all([
          getBlogPosts(),
          getPageBackground('blog')
        ]);
        setPosts(postsRes.data);
        setBackground(bgRes.data);
      } catch (err) {
        setError('Error loading blog posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      {background && (
        <div className="page-header" style={{ backgroundImage: `url(${background.background_image})` }}>
          <div className="overlay">
            <h1>{background.title}</h1>
            <p>{background.subtitle}</p>
          </div>
        </div>
      )}
      
      <div className="container mt-5">
        {error && <div className="alert alert-danger">{error}</div>}
        
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-md-6 col-lg-4 mb-4">
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {posts.length === 0 && !error && (
          <div className="alert alert-info">No blog posts available at the moment.</div>
        )}
      </div>
    </div>
  );
};

export default Blog;
