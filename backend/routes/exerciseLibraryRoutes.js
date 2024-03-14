const express = require('express');
const router = express.Router();
const ExerciseLibraryController = require('../controllers/exerciseLibraryController');

// Routes for exercise library
router.get('/', ExerciseLibraryController.getAllExercises);
router.get('/:id', ExerciseLibraryController.getExerciseById);
router.post('/', ExerciseLibraryController.createExercise);
router.put('/:id', ExerciseLibraryController.updateExercise);
router.delete('/:id', ExerciseLibraryController.deleteExercise);

module.exports = router;
