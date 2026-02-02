const Officer = require('../models/Officer');
const fs = require('fs').promises;
const path = require('path');

// Get all active officers
const getOfficers = async (req, res) => {
  try {
    // Try MongoDB first
    if (Officer.db && Officer.db.readyState === 1) {
      const officers = await Officer.find({ is_active: true }).sort({ order: 1, name: 1 });
      return res.json(officers);
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/officers.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const officers = JSON.parse(data);
    const activeOfficers = officers.filter(o => o.is_active).sort((a, b) => a.order - b.order);
    res.json(activeOfficers);
  } catch (error) {
    console.error('Error fetching officers:', error);
    res.status(500).json({ message: 'Error fetching officers', error: error.message });
  }
};

module.exports = {
  getOfficers
};
