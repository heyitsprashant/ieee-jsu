import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPostBySlug } from '../services/api';
import Loading from '../components/Loading';
import '../styles/BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getBlogPostBySlug(slug);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!post) return <div className="alert alert-warning">Blog post not found</div>;

  const postDate = new Date(post.createdAt);

  return (
    <div className="blog-detail-page">
      <div className="container py-5">
        <article className="blog-post">
          {post.image && (
            <img 
              src={post.image} 
              alt={post.title} 
              className="blog-detail-image"
            />
          )}
          
          <h1>{post.title}</h1>
          
          <div className="blog-post-meta">
            <span><i className="fas fa-user"></i> {post.author}</span>
            <span><i className="fas fa-calendar"></i> {postDate.toLocaleDateString()}</span>
          </div>

          {post.video_url && (
            <div className="blog-video mb-4">
              <div className="ratio ratio-16x9">
                <iframe 
                  src={post.video_url} 
                  title={post.title}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </article>

        <div className="blog-actions">
          <a href="/blog" className="btn btn-outline-primary">
            <i className="fas fa-arrow-left"></i> Back to Blog
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
