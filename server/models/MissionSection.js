const mongoose = require('mongoose');

const missionSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 200,
    default: 'Our Mission'
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
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Pre-save middleware to ensure only one mission section is active
missionSectionSchema.pre('save', async function(next) {
  if (this.is_active) {
    await mongoose.model('MissionSection').updateMany(
      { _id: { $ne: this._id } },
      { is_active: false }
    );
  }
  next();
});

module.exports = mongoose.model('MissionSection', missionSectionSchema);
