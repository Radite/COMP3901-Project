const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  schedule: [{
    day: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    }
  }],
});

const Trainer = mongoose.model('Trainer', trainerSchema);

module.exports = Trainer;
