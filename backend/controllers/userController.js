const User = require('../models/userModel');

// Controller methods for handling user-related operations

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        ID_number: req.body.ID_number,
        role: req.body.role,
        height: req.body.height,
        weight: req.body.weight
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.username = req.body.username || user.username;
            user.password = req.body.password || user.password;
            user.ID_number = req.body.ID_number || user.ID_number;
            user.role = req.body.role || user.role;
            user.height = req.body.height || user.height;
            user.weight = req.body.weight || user.weight;

            const updatedUser = await user.save();
            res.json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            console.log('User not found:', req.params.id);
            return res.status(404).json({ message: 'User not found' });
        }
        
        await user.deleteOne();
        console.log('User deleted:', user);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: err.message });
    }
};

