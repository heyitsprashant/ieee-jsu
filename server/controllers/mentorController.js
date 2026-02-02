const Mentor = require('../models/Mentor');

// @desc    Get all active mentors
// @route   GET /api/mentors
// @access  Public
exports.getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({ is_active: true })
      .sort({ order: 1, name: 1 });
    res.json(mentors);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single mentor by ID
// @route   GET /api/mentors/:id
// @access  Public
exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new mentor
// @route   POST /api/admin/mentors
// @access  Private (Admin)
exports.createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.status(201).json(mentor);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Update mentor
// @route   PUT /api/admin/mentors/:id
// @access  Private (Admin)
exports.updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Delete mentor
// @route   DELETE /api/admin/mentors/:id
// @access  Private (Admin)
exports.deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndDelete(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
