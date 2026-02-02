const HomeInformation = require('../models/HomeInformation');
const AboutSection = require('../models/AboutSection');
const PageBackground = require('../models/PageBackground');

// @desc    Get home page information
// @route   GET /api/home
// @access  Public
exports.getHomeInfo = async (req, res) => {
  try {
    const sections = await HomeInformation.find({ is_active: true })
      .sort({ order: 1, createdAt: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get about page sections
// @route   GET /api/about
// @access  Public
exports.getAboutSections = async (req, res) => {
  try {
    const sections = await AboutSection.find({ is_active: true })
      .sort({ section_order: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get page background
// @route   GET /api/backgrounds/:page
// @access  Public
exports.getPageBackground = async (req, res) => {
  try {
    const background = await PageBackground.findOne({ 
      page: req.params.page,
      is_active: true 
    });
    
    if (!background) {
      return res.status(404).json({ message: 'Background not found' });
    }
    
    res.json(background);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
