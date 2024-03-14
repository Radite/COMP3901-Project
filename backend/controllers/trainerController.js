const Trainer = require('../models/trainerModel');

// Controller methods for handling trainer-related operations

// Get all trainers
exports.getAllTrainers = async (req, res) => {
    try {
        const trainers = await Trainer.find();
        res.json(trainers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single trainer by ID
exports.getTrainerById = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (trainer) {
            res.json(trainer);
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new trainer
exports.createTrainer = async (req, res) => {
    const trainer = new Trainer({
        name: req.body.name,
        specialization: req.body.specialization,
        schedule: req.body.schedule
    });
    try {
        const newTrainer = await trainer.save();
        res.status(201).json(newTrainer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a trainer by ID
exports.updateTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (trainer) {
            trainer.name = req.body.name || trainer.name;
            trainer.specialization = req.body.specialization || trainer.specialization;
            trainer.schedule = req.body.schedule || trainer.schedule;

            const updatedTrainer = await trainer.save();
            res.json(updatedTrainer);
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a trainer by ID
exports.deleteTrainer = async (req, res) => {
    try {
        const trainer = await Trainer.findById(req.params.id);
        if (trainer) {
            await trainer.deleteOne();
            res.json({ message: 'Trainer deleted' });
        } else {
            res.status(404).json({ message: 'Trainer not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
