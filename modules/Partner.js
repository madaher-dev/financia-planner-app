const mongoose = require('mongoose');
const opts = { toJSON: { virtuals: true } };
const PartnerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },

    date: {
      type: Date,
      default: Date.now,
    },
    dob: {
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
    income: {
      type: Number,
      default: 0,
    },
    increase: {
      type: Number,
      default: 0,
    },
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  opts
);

// Create a virtual property `fullName` with a getter and setter.
PartnerSchema.virtual('fullName')
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

module.exports = mongoose.model('partners', PartnerSchema);
