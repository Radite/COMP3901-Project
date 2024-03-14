const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  video_url: {
    type: String,
    required: true
  }
});

const ExerciseLibrary = mongoose.model('ExerciseLibrary', exerciseSchema);

module.exports = ExerciseLibrary;
