const mongoose = require('mongoose');

const AssetSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
  },
  returnValue: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('assets', AssetSchema);
