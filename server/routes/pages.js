const express = require('express');
const router = express.Router();
const {
  getHomeInfo,
  getAboutSections,
  getPageBackground
} = require('../controllers/pageController');

router.get('/home', getHomeInfo);
router.get('/about', getAboutSections);
router.get('/backgrounds/:page', getPageBackground);

module.exports = router;
