const express = require('express');
const router = express.Router();
const {
  getOfficers,
  getOfficerById,
  createOfficer,
  updateOfficer,
  deleteOfficer
} = require('../controllers/officerController');

router.get('/', getOfficers);
router.get('/:id', getOfficerById);

// Admin routes (can add auth middleware later)
router.post('/', createOfficer);
router.put('/:id', updateOfficer);
router.delete('/:id', deleteOfficer);

module.exports = router;
