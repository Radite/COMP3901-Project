const TrainingSession = require('../models/trainingSessionModel');

// Controller methods for handling training session-related operations

// Get all training sessions
exports.getAllTrainingSessions = async (req, res) => {
    try {
        const sessions = await TrainingSession.find();
        res.json(sessions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single training session by ID
exports.getTrainingSessionById = async (req, res) => {
    try {
        const session = await TrainingSession.findById(req.params.id);
        if (session) {
            res.json(session);
        } else {
            res.status(404).json({ message: 'Training session not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new training session
exports.createTrainingSession = async (req, res) => {
    const session = new TrainingSession({
        trainer: req.body.trainer,
        user: req.body.user,
        time: req.body.time
    });
    try {
        const newSession = await session.save();
        res.status(201).json(newSession);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a training session by ID
exports.updateTrainingSession = async (req, res) => {
    try {
        const session = await TrainingSession.findById(req.params.id);
        if (session) {
            session.trainer = req.body.trainer || session.trainer;
            session.user = req.body.user || session.user;
            session.time = req.body.time || session.time;

            const updatedSession = await session.save();
            res.json(updatedSession);
        } else {
            res.status(404).json({ message: 'Training session not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a training session by ID
exports.deleteTrainingSession = async (req, res) => {
    try {
        const session = await TrainingSession.findById(req.params.id);
        if (session) {
            await session.deleteOne();
            res.json({ message: 'Training session deleted successfully' });
        } else {
            res.status(404).json({ message: 'Training session not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
