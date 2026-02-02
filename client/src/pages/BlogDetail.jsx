import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPost } from '../services/api';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getBlogPost(slug);
        setPost(response.data);
      } catch (err) {
        setError('Blog post not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
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

  if (error || !post) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error || 'Blog post not found'}</div>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      <div className="container mt-5">
        <article className="blog-article">
          <header className="mb-4">
            {post.image && (
              <img src={post.image} alt={post.title} className="img-fluid rounded mb-3" />
            )}
            <h1>{post.title}</h1>
            <p className="blog-meta text-muted">
              <span><i className="fas fa-user"></i> {post.author}</span>
              <span className="mx-3"><i className="fas fa-calendar"></i> {formatDate(post.createdAt)}</span>
            </p>
          </header>

          {post.video_url && (
            <div className="ratio ratio-16x9 mb-4">
              <iframe
                src={post.video_url.replace('watch?v=', 'embed/')}
                title={post.title}
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className="blog-content">
            <p style={{ whiteSpace: 'pre-wrap' }}>{post.content}</p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;
