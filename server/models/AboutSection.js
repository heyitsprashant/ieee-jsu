const mongoose = require('mongoose');

const aboutSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
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
    type: String,
    maxlength: 50
  },
  button_url: {
    type: String,
    maxlength: 200
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

aboutSectionSchema.index({ section_order: 1 });

module.exports = mongoose.model('AboutSection', aboutSectionSchema);
