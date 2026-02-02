const StudentOfficer = require('../models/StudentOfficer');

// @desc    Get all active student officers
// @route   GET /api/officers
// @access  Public
exports.getOfficers = async (req, res) => {
  try {
    const officers = await StudentOfficer.find({ is_active: true })
      .sort({ order: 1, name: 1 });
    res.json(officers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single officer by ID
// @route   GET /api/officers/:id
// @access  Public
exports.getOfficerById = async (req, res) => {
  try {
    const officer = await StudentOfficer.findById(req.params.id);
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    res.json(officer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new officer
// @route   POST /api/admin/officers
// @access  Private (Admin)
exports.createOfficer = async (req, res) => {
  try {
    const officer = await StudentOfficer.create(req.body);
    res.status(201).json(officer);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Update officer
// @route   PUT /api/admin/officers/:id
// @access  Private (Admin)
exports.updateOfficer = async (req, res) => {
  try {
    const officer = await StudentOfficer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    res.json(officer);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Delete officer
// @route   DELETE /api/admin/officers/:id
// @access  Private (Admin)
exports.deleteOfficer = async (req, res) => {
  try {
    const officer = await StudentOfficer.findByIdAndDelete(req.params.id);
    if (!officer) {
      return res.status(404).json({ message: 'Officer not found' });
    }
    res.json({ message: 'Officer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
