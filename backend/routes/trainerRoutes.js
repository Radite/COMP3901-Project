const express = require('express');
const router = express.Router();
const TrainerController = require('../controllers/trainerController');

// Routes for trainers
router.get('/', TrainerController.getAllTrainers);
router.get('/:id', TrainerController.getTrainerById);
router.post('/', TrainerController.createTrainer);
router.put('/:id', TrainerController.updateTrainer);
router.delete('/:id', TrainerController.deleteTrainer);

module.exports = router;
