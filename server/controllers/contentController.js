const PageBackground = require('../models/PageBackground');
const HomeInformation = require('../models/HomeInformation');
const AboutSection = require('../models/AboutSection');
const fs = require('fs').promises;
const path = require('path');

// Get page background
const getPageBackground = async (req, res) => {
  try {
    const { page } = req.params;
    
    // Try MongoDB first
    if (PageBackground.db && PageBackground.db.readyState === 1) {
      const background = await PageBackground.findOne({ page, is_active: true });
      return res.json(background || null);
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/backgrounds.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const backgrounds = JSON.parse(data);
    const background = backgrounds.find(b => b.page === page && b.is_active);
    
    res.json(background || null);
  } catch (error) {
    console.error('Error fetching page background:', error);
    res.status(500).json({ message: 'Error fetching page background', error: error.message });
  }
};

// Get home sections
const getHomeSections = async (req, res) => {
  try {
    // Try MongoDB first
    if (HomeInformation.db && HomeInformation.db.readyState === 1) {
      const sections = await HomeInformation.find({ is_active: true }).sort({ order: 1 });
      return res.json(sections);
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/home-sections.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const sections = JSON.parse(data);
    const activeSections = sections.filter(s => s.is_active).sort((a, b) => a.order - b.order);
    res.json(activeSections);
  } catch (error) {
    console.error('Error fetching home sections:', error);
    res.status(500).json({ message: 'Error fetching home sections', error: error.message });
  }
};

// Get about sections
const getAboutSections = async (req, res) => {
  try {
    // Try MongoDB first
    if (AboutSection.db && AboutSection.db.readyState === 1) {
      const sections = await AboutSection.find({ is_active: true }).sort({ section_order: 1 });
      return res.json(sections);
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/about-sections.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const sections = JSON.parse(data);
    const activeSections = sections.filter(s => s.is_active).sort((a, b) => a.section_order - b.section_order);
    res.json(activeSections);
  } catch (error) {
    console.error('Error fetching about sections:', error);
    res.status(500).json({ message: 'Error fetching about sections', error: error.message });
  }
};

module.exports = {
  getPageBackground,
  getHomeSections,
  getAboutSections
};
