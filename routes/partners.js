const express = require('express');
const { route } = require('./auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const Partner = require('../modules/Partner');
const auth = require('../middleware/auth');

// @route   POST api/partners
// @desc    add a partner
// @access  Private

router.post(
  '/',
  [
    auth,
    [
      check('pfirstName', 'Please include a first name').not().isEmpty(),
      check('plastName', 'Please include a last name').not().isEmpty(),
      body('pemail')
        .if((value, { req }) => req.body.pemail)
        .isEmail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    let {
      pfirstName,
      plastName,
      pdob,
      pemail,
      ptitle,
      poccupation,
      pphone,
    } = req.body;

    pemail = pemail.toLowerCase();
    const partner = req.user.id;

    try {
      newPartner = new Partner({
        firstName: pfirstName,
        lastName: plastName,
        dob: pdob,
        email: pemail,
        title: ptitle,
        occupation: poccupation,
        phone: pphone,
        partner,
      });

      await newPartner.save();

      res.json(newPartner);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
