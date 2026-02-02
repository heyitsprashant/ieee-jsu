const mongoose = require('mongoose');

const pageBackgroundSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true,
    unique: true,
    enum: ['home', 'about', 'blog', 'events', 'members', 'contact']
  },
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  subtitle: {
    type: String,
    required: true,
    maxlength: 500
  },
  background_image: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

pageBackgroundSchema.index({ page: 1 });

module.exports = mongoose.model('PageBackground', pageBackgroundSchema);
