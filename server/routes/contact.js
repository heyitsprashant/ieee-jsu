const express = require('express');
const router = express.Router();
const {
  submitContact,
  getContacts
} = require('../controllers/contactController');

router.post('/', submitContact);

// Admin route (can add auth middleware later)
router.get('/', getContacts);

module.exports = router;
