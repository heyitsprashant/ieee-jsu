const Mentor = require('../models/Mentor');
const fs = require('fs').promises;
const path = require('path');

// Get all active mentors
const getMentors = async (req, res) => {
  try {
    // Try MongoDB first
    if (Mentor.db && Mentor.db.readyState === 1) {
      const mentors = await Mentor.find({ is_active: true }).sort({ order: 1, name: 1 });
      return res.json(mentors);
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/mentors.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const mentors = JSON.parse(data);
    const activeMentors = mentors.filter(m => m.is_active).sort((a, b) => a.order - b.order);
    res.json(activeMentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ message: 'Error fetching mentors', error: error.message });
  }
};

module.exports = {
  getMentors
};
