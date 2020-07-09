const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const User = require('../modules/User');
// const nodemailer = require('nodemailer');
// var crypto = require('crypto');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   Post api/auth
// @desc    Auth user & get tocken (Login)
// @access  Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a valid password').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { email, password } = req.body;
    email = email.toLowerCase();
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
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
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   Post api/users/forgot
// @desc    Check if User Exists and Send Email (Forget Pass)
// @access  Public

// router.put(
//   '/forgot',
//   [check('email', 'Please include a valid email').isEmail()],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { email } = req.body;
//     try {
//       let user = await Planner.findOne({ email });
//       if (!user) {
//         return res.status(400).json({
//           errors: [
//             {
//               msg:
//                 'That email addrss is not recognized. Please try again or register for a new account ',
//             },
//           ],
//         });
//       }

//       var email_token = crypto.randomBytes(64).toString('hex');

//       const payload = {
//         resetPasswordToken: email_token,
//         resetPasswordExpires: Date.now() + 3600000,
//       };

//       const addToken = await Planner.findByIdAndUpdate(
//         user.id,
//         { $set: payload },
//         { new: true }
//       );

//       const transporter = nodemailer.createTransport({
//         host: 'mail.butula.net',
//         port: 587,
//         secure: false, // upgrade later with STARTTLS
//         auth: {
//           user: config.get('EMAIL_ADDRESS'),
//           pass: config.get('EMAIL_PASSWORD'),
//         },
//         tls: {
//           rejectUnauthorized: false,
//         },
//       });

//       const mailOptions = {
//         from: 'info@butula.net',
//         to: `${user.email}`,
//         subject: 'Link To Reset Password',
//         text:
//           'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
//           'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
//           `https://financial-planner-pringles.herokuapp.com/reset/${email_token}\n\n` +
//           'If you did not request this, please ignore this email and your password will remain unchanged.\n',
//       };

//       console.log('sending mail');

//       transporter.sendMail(mailOptions, (err, response) => {
//         if (err) {
//           console.error('there was an error: ', err);
//         } else {
//           console.log('here is the res: ', response);
//           return res.status(200).json('recovery email sent');
//         }
//       });
//     } catch (err) {
//       console.log(err.message);
//       return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
//     }
//   }
// );

// @route   Post api/auth/updatePasswordViaEmail
// @desc    Update Password via email
// @access  Public (requires email token)

// router.put(
//   '/updatePasswordViaEmail',

//   async (req, res) => {
//     try {
//       const user = await User.findOne(
//         {
//           email: req.body.email,
//           resetPasswordToken: req.body.email_token,
//         }
//         // { email: 1 }
//       );

//       if (user == null) {
//         console.error('password reset link is invalid or has expired');
//         return res
//           .status(403)
//           .send('password reset link is invalid or has expired');
//       } else if (user != null) {
//         console.log('user exists in db');

//         const payload = {
//           password: null,
//           resetPasswordToken: null,
//           resetPasswordExpires: null,
//         };

//         const salt = await bcrypt.genSalt(10);
//         payload.password = await bcrypt.hash(req.body.password, salt);

//         const updatePass = await Planner.findByIdAndUpdate(
//           user.id,
//           { $set: payload },
//           { new: true }
//         );

//         const payload2 = {
//           user: {
//             id: user.id,
//           },
//         };
//         jwt.sign(
//           payload2,
//           config.get('jwtSecret'),
//           { expiresIn: 360000 },
//           (err, token) => {
//             if (err) throw err;
//             return res.json({ token });
//           }
//         );
//       }
//     } catch (err) {
//       console.error('no user exists in db to update');
//       return res.status(401).json('no user exists in db to update');
//     }
//   }
// );

module.exports = router;
