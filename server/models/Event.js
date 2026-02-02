const mongoose = require('mongoose');
const slugify = require('slugify');

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
    default: ''
  },
  order: {
    type: Number,
    default: 0
  }
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  registration_link: {
    type: String,
    default: ''
  },
  has_gallery: {
    type: Boolean,
    default: false
  },
  gallery_items: [eventGalleryItemSchema]
}, {
  timestamps: true
});

// Auto-generate slug before saving
eventSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Event', eventSchema);
