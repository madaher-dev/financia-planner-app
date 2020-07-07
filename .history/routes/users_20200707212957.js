const express = require('express');
const { route } = require('./auth');
const router = express.Router();
// const bcrypt = require('bcryptjs');
// const { check, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const config = require('config');
// const User = require('../modules/User');
// const Planner = require('../modules/Planner');
// const auth = require('../middleware/auth');

// @route   POST api/users/edit
// @desc    Register a User
// @access  Public

router.post('/', (req, res) => {
  res.send('Register a user');
});

// @route   POST api/users/edit
// @desc    Edit a User
// @access  Private
// router.post(
//   '/edit',
//   [
//     auth,
//     [
//       check('firstName', 'Please include a first name').not().isEmpty(),
//       check('lastName', 'Please include a family name').not().isEmpty(),
//       check('email', 'Please include a valid email').isEmail(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({
//         errors: errors.array(),
//       });
//     }

//     const {
//       firstName,
//       lastName,
//       email,
//       id,
//       title,
//       occupation,
//       partner,
//       phone,
//       comments,
//       planner,
//       useDefaultSettings,
//     } = req.body;
//     const userFields = {};
//     if (firstName) userFields.firstName = firstName;
//     if (lastName) userFields.lastName = lastName;
//     if (email) userFields.email = email;
//     if (phone) userFields.phone = phone;
//     if (title) userFields.title = title;
//     if (occupation) userFields.occupation = occupation;
//     if (comments) userFields.comments = comments;
//     userFields.partner = partner;
//     userFields.useDefaultSettings = useDefaultSettings;

//     try {
//       // check if user is an admin or a planner (from token)
//       user = await Planner.findById(req.user.id);

//       if (user.type === 'Admin') {
//         user = await User.findByIdAndUpdate(
//           id,
//           { $set: userFields },
//           { new: true }
//         );
//         res.json(user);
//       } else if (user.type === 'Planner' && planner === user.id) {
//         user = await User.findByIdAndUpdate(
//           id,
//           { $set: userFields },
//           { new: true }
//         );
//         res.json(user);
//       } else res.status(401).json({ msg: 'Unauthorized' });
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   }
// );

module.exports = router;
