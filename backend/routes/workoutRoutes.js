const express = require('express');
const router = express.Router();
const WorkoutController = require('../controllers/workoutController');

// Routes for workouts
router.get('/', WorkoutController.getAllWorkouts);
router.get('/:id', WorkoutController.getWorkoutById);
router.post('/', WorkoutController.createWorkout);
router.put('/:id', WorkoutController.updateWorkout);
router.delete('/:id', WorkoutController.deleteWorkout);

module.exports = router;
