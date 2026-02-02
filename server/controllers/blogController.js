const BlogPost = require('../models/BlogPost');
const fs = require('fs').promises;
const path = require('path');

// Get all published blog posts
const getBlogPosts = async (req, res) => {
  try {
    // Try MongoDB first
    if (BlogPost.db && BlogPost.db.readyState === 1) {
      const posts = await BlogPost.find({ is_published: true }).sort({ createdAt: -1 });
      return res.json(posts);
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/blog.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const posts = JSON.parse(data);
    const publishedPosts = posts.filter(p => p.is_published).sort((a, b) => 
      new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.json(publishedPosts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ message: 'Error fetching blog posts', error: error.message });
  }
};

// Get single blog post by slug
const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Try MongoDB first
    if (BlogPost.db && BlogPost.db.readyState === 1) {
      const post = await BlogPost.findOne({ slug, is_published: true });
      if (!post) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      return res.json(post);
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/blog.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const posts = JSON.parse(data);
    const post = posts.find(p => p.slug === slug && p.is_published);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ message: 'Error fetching blog post', error: error.message });
  }
};

module.exports = {
  getBlogPosts,
  getBlogPostBySlug
};
