const ExerciseLibrary = require('../models/exerciseLibraryModel');

// Controller methods for handling exercise library-related operations

// Get all exercises in the library
exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await ExerciseLibrary.find();
        res.json(exercises);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single exercise by ID
exports.getExerciseById = async (req, res) => {
    try {
        const exercise = await ExerciseLibrary.findById(req.params.id);
        if (exercise) {
            res.json(exercise);
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new exercise
exports.createExercise = async (req, res) => {
    const exercise = new ExerciseLibrary({
        name: req.body.name,
        description: req.body.description,
        video_url: req.body.video_url
    });
    try {
        const newExercise = await exercise.save();
        res.status(201).json(newExercise);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an exercise by ID
exports.updateExercise = async (req, res) => {
    try {
        const exercise = await ExerciseLibrary.findById(req.params.id);
        if (exercise) {
            exercise.name = req.body.name || exercise.name;
            exercise.description = req.body.description || exercise.description;
            exercise.video_url = req.body.video_url || exercise.video_url;

            const updatedExercise = await exercise.save();
            res.json(updatedExercise);
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an exercise by ID
exports.deleteExercise = async (req, res) => {
    try {
        const exercise = await ExerciseLibrary.findById(req.params.id);
        if (exercise) {
            await exercise.deleteOne();
            res.json({ message: 'Exercise deleted successfully' });
        } else {
            res.status(404).json({ message: 'Exercise not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
