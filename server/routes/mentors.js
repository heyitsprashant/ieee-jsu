const express = require('express');
const router = express.Router();
const {
  getMentors,
  getMentorById,
  createMentor,
  updateMentor,
  deleteMentor
} = require('../controllers/mentorController');

router.get('/', getMentors);
router.get('/:id', getMentorById);

// Admin routes (can add auth middleware later)
router.post('/', createMentor);
router.put('/:id', updateMentor);
router.delete('/:id', deleteMentor);

module.exports = router;
