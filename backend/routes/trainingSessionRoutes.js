const express = require('express');
const router = express.Router();
const TrainingSessionController = require('../controllers/trainingSessionController');

// Routes for training sessions
router.get('/', TrainingSessionController.getAllTrainingSessions);
router.get('/:id', TrainingSessionController.getTrainingSessionById);
router.post('/', TrainingSessionController.createTrainingSession);
router.put('/:id', TrainingSessionController.updateTrainingSession);
router.delete('/:id', TrainingSessionController.deleteTrainingSession);

module.exports = router;
