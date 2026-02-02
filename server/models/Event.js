const mongoose = require('mongoose');

const eventGalleryItemSchema = new mongoose.Schema({
  media_type: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  image: {
    type: String
  },
  video_url: {
    type: String
  },
  caption: {
    type: String,
    maxlength: 200
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true
  },
  excerpt: {
    type: String
  },
  content: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  registration_link: {
    type: String,
    maxlength: 200
  },
  has_gallery: {
    type: Boolean,
    default: false
  },
  gallery_items: [eventGalleryItemSchema]
}, {
  timestamps: true
});

// Auto-generate slug from title if not provided
eventSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

eventSchema.index({ date: -1 });
eventSchema.index({ slug: 1 });

module.exports = mongoose.model('Event', eventSchema);
