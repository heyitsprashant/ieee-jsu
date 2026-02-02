const express = require('express');
const router = express.Router();
const { getMentors } = require('../controllers/mentorController');

router.get('/', getMentors);

module.exports = router;
