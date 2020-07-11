const mongoose = require('mongoose');

const ChildSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
  school: {
    type: Number,
    default: 0,
  },
  uni: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('family', ChildSchema);
