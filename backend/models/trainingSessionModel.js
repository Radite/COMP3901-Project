const mongoose = require('mongoose');

const trainingSessionSchema = new mongoose.Schema({
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trainer',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  time: {
    type: Date,
    required: true
  },

});

const TrainingSession = mongoose.model('TrainingSession', trainingSessionSchema);

module.exports = TrainingSession;
