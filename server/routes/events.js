const express = require('express');
const router = express.Router();
const {
  getEvents,
  getEventBySlug,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/eventController');

router.get('/', getEvents);
router.get('/:slug', getEventBySlug);

// Admin routes (can add auth middleware later)
router.post('/', createEvent);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
