const express = require('express');
const { route } = require('./auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../modules/User');
const auth = require('../middleware/auth');

// @route   POST api/users
// @desc    Register a User
// @access  Public

router.post(
  '/',
  [
    check('firstName', 'Please include a first name').not().isEmpty(),
    check('lastName', 'Please include a last name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let {
      firstName,
      lastName,
      dob,
      email,
      password,
      title,
      occupation,
      phone,
      partner,
    } = req.body;
    email = email.toLowerCase();

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        firstName,
        lastName,
        dob,
        email,
        password,
        title,
        occupation,
        phone,
        partner,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   POST api/users
// @desc    Edit a User
// @access  Private
router.put('/', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {
    firstName,
    lastName,
    email,

    title,
    occupation,
    dob,
    phone,
    partner,
  } = req.body;

  const userFields = {};
  if (firstName) userFields.firstName = firstName;
  if (lastName) userFields.lastName = lastName;
  if (email) userFields.email = email;
  if (phone) userFields.phone = phone;
  if (title) userFields.title = title;
  if (occupation) userFields.occupation = occupation;
  if (dob) userFields.dob = dob;

  userFields.partner = partner;
  userFields.completedReg = true;

  try {
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: userFields },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
