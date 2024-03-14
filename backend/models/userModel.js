const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  ID_number: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['gym_goer', 'admin'], 
    default: 'gym_goer'
  },
  height: {
    type: Number
  },
  weight: {
    type: Number
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
