const mongoose = require('mongoose');

const studentOfficerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  position: {
    type: String,
    required: true,
    maxlength: 100
  },
  image: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    maxlength: 200
  },
  github: {
    type: String,
    maxlength: 200
  },
  email: {
    type: String,
    maxlength: 200
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

// Sort by order, then by name
studentOfficerSchema.index({ order: 1, name: 1 });

module.exports = mongoose.model('StudentOfficer', studentOfficerSchema);
