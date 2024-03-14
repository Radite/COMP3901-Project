const mongoose = require('mongoose');

// Define the schema for a set
const setSchema = new mongoose.Schema({
  reps: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: true
  }
});

// Define the schema for an exercise
const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sets: [setSchema]
});

// Define the schema for a workout
const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  exercises: [exerciseSchema]
});

// Create the model from the schema and export it
const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
