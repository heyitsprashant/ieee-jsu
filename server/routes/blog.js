const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostBySlug,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blogController');

router.get('/', getBlogPosts);
router.get('/:slug', getBlogPostBySlug);

// Admin routes (can add auth middleware later)
router.post('/', createBlogPost);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

module.exports = router;
