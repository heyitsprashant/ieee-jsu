const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  last_name: {
    type: String,
    required: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

contactSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
