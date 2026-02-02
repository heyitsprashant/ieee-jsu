const Event = require('../models/Event');
const fs = require('fs').promises;
const path = require('path');

// Get all events with filtering and pagination
const getEvents = async (req, res) => {
  try {
    const { status, page = 1, limit = 8 } = req.query;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Try MongoDB first
    if (Event.db && Event.db.readyState === 1) {
      let query = {};
      
      if (status === 'active') {
        query.date = { $gte: today };
      } else if (status === 'past') {
        query.date = { $lt: today };
      }
      
      const skip = (parseInt(page) - 1) * parseInt(limit);
      const events = await Event.find(query)
        .sort(status === 'past' ? { date: -1 } : { date: 1 })
        .skip(skip)
        .limit(parseInt(limit));
        
      const total = await Event.countDocuments(query);
      
      return res.json({
        events,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / parseInt(limit))
      });
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/events.json');
    const data = await fs.readFile(dataPath, 'utf8');
    let events = JSON.parse(data);
    
    // Filter by status
    if (status === 'active') {
      events = events.filter(e => new Date(e.date) >= today);
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (status === 'past') {
      events = events.filter(e => new Date(e.date) < today);
      events.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedEvents = events.slice(startIndex, endIndex);
    
    res.json({
      events: paginatedEvents,
      total: events.length,
      page: parseInt(page),
      pages: Math.ceil(events.length / parseInt(limit))
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get single event by slug
const getEventBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    // Try MongoDB first
    if (Event.db && Event.db.readyState === 1) {
      const event = await Event.findOne({ slug });
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      return res.json(event);
    }
    
    // Fallback to JSON file
    const dataPath = path.join(__dirname, '../data/events.json');
    const data = await fs.readFile(dataPath, 'utf8');
    const events = JSON.parse(data);
    const event = events.find(e => e.slug === slug);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

module.exports = {
  getEvents,
  getEventBySlug
};
