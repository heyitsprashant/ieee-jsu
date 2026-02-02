const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  google_scholar: {
    type: String,
    default: ''
  },
  personal_website: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    required: true
  },
  expertise: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mentor', mentorSchema);
