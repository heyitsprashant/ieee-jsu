import React, { useState, useEffect } from 'react';
import { getBlogPosts, getPageBackground } from '../services/api';
import BlogCard from '../components/BlogCard';
import Loading from '../components/Loading';
import '../styles/Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [background, setBackground] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const [postsRes, bgRes] = await Promise.all([
        getBlogPosts({ page: currentPage, limit: 6 }),
        getPageBackground('blog').catch(() => ({ data: null }))
      ]);
      
      setPosts(postsRes.data.posts);
      setTotalPages(postsRes.data.totalPages);
      setBackground(bgRes.data);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && currentPage === 1) return <Loading />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="blog-page">
      <header className="page-header">
        <div className="header-overlay">
          <img 
            src={background?.background_image || '/assets/jsu-anglehall.jpg'} 
            alt="Background" 
          />
        </div>
        <div className="header-content">
          <h1>{background?.title || 'Our Blog'}</h1>
          <p>{background?.subtitle || 'Read our latest posts and updates'}</p>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          {posts && posts.length > 0 ? (
            <>
              <div className="row">
                {posts.map((post) => (
                  <div key={post._id} className="col-md-6 col-lg-4 mb-4">
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <nav aria-label="Blog pagination">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li 
                        key={index + 1} 
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                      >
                        <button 
                          className="page-link" 
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="alert alert-info">No blog posts available yet.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
