const mongoose = require('mongoose');

const aboutSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'About Us'
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  button_text: {
    type: String
  },
  button_url: {
    type: String
  },
  section_order: {
    type: Number,
    default: 1
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AboutSection', aboutSectionSchema);
