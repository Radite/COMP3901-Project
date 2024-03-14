const mongoose = require('mongoose');

const checkinSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  checkin_time: {
    type: Date,
    default: Date.now,
    required: true
  },
  checkout_time: {
    type: Date,
    required: true
  },
  expiration_time: {
    type: Date,
    required: true
  }
});

const Checkin = mongoose.model('Checkin', checkinSchema);

module.exports = Checkin;
