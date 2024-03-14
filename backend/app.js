const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const trainingSessionRoutes = require('./routes/trainingSessionRoutes');
const checkinRoutes = require('./routes/checkinRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseLibraryRoutes = require('./routes/exerciseLibraryRoutes');

const app = express();

// Middleware setup
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/testdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes setup
app.use('/api/users', userRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/trainingsessions', trainingSessionRoutes);
app.use('/api/checkins', checkinRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exerciseLibrary', exerciseLibraryRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Export for testing purposes
