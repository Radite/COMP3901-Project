const Checkin = require('../models/checkinModel');

// Controller methods for handling check-in/check-out-related operations

// Get all check-ins
exports.getAllCheckins = async (req, res) => {
    try {
        const checkins = await Checkin.find();
        res.json(checkins);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single check-in by ID
exports.getCheckinById = async (req, res) => {
    try {
        const checkin = await Checkin.findById(req.params.id);
        if (checkin) {
            res.json(checkin);
        } else {
            res.status(404).json({ message: 'Check-in not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new check-in
exports.createCheckin = async (req, res) => {
    const checkin = new Checkin({
      user_id: req.body.user_id,
      checkin_time: req.body.checkin_time,
      checkout_time: req.body.checkout_time, 
      expiration_time: req.body.expiration_time 
    });
    try {
      const newCheckin = await checkin.save();
      res.status(201).json(newCheckin);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
// Update a check-in by ID
exports.updateCheckin = async (req, res) => {
    try {
        const checkin = await Checkin.findById(req.params.id);
        if (checkin) {
            // Update check-in properties if needed
            // For example: checkin.checkout_time = req.body.checkout_time;
            const updatedCheckin = await checkin.save();
            res.json(updatedCheckin);
        } else {
            res.status(404).json({ message: 'Check-in not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a check-in by ID
exports.deleteCheckin = async (req, res) => {
    try {
        const checkin = await Checkin.findById(req.params.id);
        if (checkin) {
            await checkin.deleteOne();
            res.json({ message: 'Checkin deleted successfully' });
        } else {
            res.status(404).json({ message: 'Check-in not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
