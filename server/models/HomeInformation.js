const mongoose = require('mongoose');

const homeInformationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  section_type: {
    type: String,
    enum: ['text_media', 'media_only'],
    default: 'text_media'
  },
  media_type: {
    type: String,
    enum: ['image', 'video', 'video_link'],
    default: 'image'
  },
  image: {
    type: String
  },
  video: {
    type: String
  },
  video_link: {
    type: String
  },
  is_homepage_feature: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HomeInformation', homeInformationSchema);
