const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Goals = require('../modules/Goals');

// @route   GET api/goals
// @desc    Get user goals
// @access  Private

router.get('/', auth, async (req, res) => {
  try {
    const goal = await Goals.findOne({ user: req.user.id });
    res.json(goal);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/goals
// @desc    Edit a Goal
// @access  Private

router.put('/', auth, async (req, res) => {
  const {
    retirment,
    partnerRetirment,
    house,
    school,
    uni,
    vacation,
    vacationNum,
  } = req.body;

  const userFields = {};
  if (retirment) userFields.retirment = retirment;
  if (partnerRetirment) userFields.partnerRetirment = partnerRetirment;
  if (house) userFields.house = house;
  if (school) userFields.school = school;
  if (uni) userFields.uni = uni;
  if (vacation) userFields.vacation = vacation;
  if (vacationNum) userFields.vacationNum = vacationNum;

  try {
    goal = await Goals.findOneAndUpdate(
      { user: req.user.id },
      { $set: userFields },
      { new: true, upsert: true }
    );
    console.log(goal);
    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
