const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Child = require('../modules/Child');

// @route   GET api/family
// @desc    Get all user's family
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const family = await Child.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(family);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/family
// @desc    Add a new child
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Please fill in a name').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, age, school, uni } = req.body;

    try {
      const newChild = new Child({
        name,
        age,
        school,
        uni,
        user: req.user.id,
      });

      const child = await newChild.save();

      res.json(child);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/family/:id
// @desc    Edit Family
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, age, school, uni } = req.body;
  const familyFields = {};
  if (name) familyFields.name = name;
  if (age) familyFields.age = age;
  if (school) familyFields.school = school;
  if (uni) familyFields.uni = uni;

  try {
    let child = await Child.findById(req.params.id);
    if (!child) return res.status(404).json({ msg: 'Child not found' });

    // Make sure user owns Child
    if (child.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    child = await Child.findByIdAndUpdate(
      req.params.id,
      { $set: familyFields },
      { new: true }
    );
    res.json(child);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/family/:id
// @desc    Delete a child
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let child = await Child.findById(req.params.id);

    if (!child) return res.status(404).json({ msg: 'Child not found' });

    // Make sure user owns contact
    if (child.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Child.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Child Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
