const mongoose = require('mongoose');
const opts = { toJSON: { virtuals: true } };
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    dob: {
      type: Date,
    },

    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    title: {
      type: String,
    },
    occupation: {
      type: String,
    },
    phone: {
      type: String,
    },
    comments: {
      type: String,
    },
    partner: {
      type: Boolean,
    },
    completedReg: {
      type: Boolean,
      default: false,
    },
    useDefaultSettings: {
      type: Boolean,
      default: true,
    },
    planner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'planners',
    },
  },
  opts
);

// Create a virtual property `fullName` with a getter and setter.
UserSchema.virtual('fullName')
  .get(function () {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
  });

module.exports = mongoose.model('users', UserSchema);
