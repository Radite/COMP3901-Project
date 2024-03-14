const Workout = require('../models/workoutModel');

// Controller methods for handling workout-related operations

// Get all workouts
exports.getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.json(workouts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single workout by ID
exports.getWorkoutById = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (workout) {
            res.json(workout);
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new workout
exports.createWorkout = async (req, res) => {
    const workout = new Workout({
        user: req.body.user_id,
        date: req.body.date,
        exercises: req.body.exercises
    });
    try {
        const newWorkout = await workout.save();
        res.status(201).json(newWorkout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a workout by ID
exports.updateWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (workout) {
            workout.user_id = req.body.user_id || workout.user_id;
            workout.date = req.body.date || workout.date;
            workout.exercises = req.body.exercises || workout.exercises;

            const updatedWorkout = await workout.save();
            res.json(updatedWorkout);
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a workout by ID
exports.deleteWorkout = async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id);
        if (workout) {
            await workout.deleteOne();
            res.json({ message: 'Workout deleted successfully' });
        } else {
            res.status(404).json({ message: 'Workout not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
