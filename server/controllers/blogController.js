const BlogPost = require('../models/BlogPost');

// @desc    Get all published blog posts
// @route   GET /api/blog?page=1&limit=6
// @access  Public
exports.getBlogPosts = async (req, res) => {
  try {
    const { page = 1, limit = 6 } = req.query;
    const skip = (page - 1) * limit;

    const posts = await BlogPost.find({ is_published: true })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await BlogPost.countDocuments({ is_published: true });

    res.json({
      posts,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single blog post by slug
// @route   GET /api/blog/:slug
// @access  Public
exports.getBlogPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ 
      slug: req.params.slug, 
      is_published: true 
    });
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new blog post
// @route   POST /api/admin/blog
// @access  Private (Admin)
exports.createBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Update blog post
// @route   PUT /api/admin/blog/:id
// @access  Private (Admin)
exports.updateBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Delete blog post
// @route   DELETE /api/admin/blog/:id
// @access  Private (Admin)
exports.deleteBlogPost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
