const Event = require('../models/Event');

// @desc    Get all events (active and past)
// @route   GET /api/events?status=active&page=1&limit=8
// @access  Public
exports.getEvents = async (req, res) => {
  try {
    const { status, page = 1, limit = 8 } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let query = {};
    if (status === 'active') {
      query.date = { $gte: today };
    } else if (status === 'past') {
      query.date = { $lt: today };
    }

    const skip = (page - 1) * limit;
    
    let sort = {};
    if (status === 'past') {
      sort.date = -1; // Past events: newest first
    } else {
      sort.date = 1; // Active/all events: oldest first
    }

    const events = await Event.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Event.countDocuments(query);

    res.json({
      events,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      totalEvents: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single event by slug
// @route   GET /api/events/:slug
// @access  Public
exports.getEventBySlug = async (req, res) => {
  try {
    const event = await Event.findOne({ slug: req.params.slug });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new event
// @route   POST /api/admin/events
// @access  Private (Admin)
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Update event
// @route   PUT /api/admin/events/:id
// @access  Private (Admin)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error: error.message });
  }
};

// @desc    Delete event
// @route   DELETE /api/admin/events/:id
// @access  Private (Admin)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
