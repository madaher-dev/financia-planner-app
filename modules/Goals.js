const mongoose = require('mongoose');

const GoalsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  retirment: {
    type: Number,
    default: 0,
  },
  partnerRetirment: {
    type: Number,
  },
  uni: {
    type: Number,
    default: 0,
  },
  house: {
    type: Number,
    default: 0,
  },
  school: {
    type: Number,
    default: 0,
  },
  vacation: {
    type: Number,
    default: 0,
  },
  vacationNum: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('goals', GoalsSchema);
