const express = require('express');
const router = express.Router();
const { getPageBackground, getHomeSections, getAboutSections } = require('../controllers/contentController');

router.get('/page-background/:page', getPageBackground);
router.get('/home-sections', getHomeSections);
router.get('/about-sections', getAboutSections);

module.exports = router;
