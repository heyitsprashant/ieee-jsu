const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 500
  },
  image: {
    type: String
  },
  video_url: {
    type: String,
    maxlength: 200
  },
  is_published: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Auto-generate slug from title if not provided
blogPostSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

blogPostSchema.index({ createdAt: -1 });
blogPostSchema.index({ slug: 1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
