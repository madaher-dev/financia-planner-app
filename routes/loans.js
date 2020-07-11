const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Loan = require('../modules/Loan');

// @route   GET api/loans
// @desc    Get all user's loans
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const loans = await Loan.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(loans);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/loans
// @desc    Add a new loan
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Please fill in a name').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, amount, interest, maturity } = req.body;

    try {
      const newLoan = new Loan({
        name,
        amount,
        interest,
        maturity,
        user: req.user.id,
      });

      const loan = await newLoan.save();

      res.json(loan);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/loans/:id
// @desc    Edit Loans
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, amount, maturity, interest } = req.body;
  const loanFields = {};
  if (name) loanFields.name = name;
  if (amount) loanFields.amount = amount;
  if (maturity) loanFields.maturity = maturity;
  if (interest) loanFields.interest = interest;

  try {
    let loan = await Loan.findById(req.params.id);
    if (!loan) return res.status(404).json({ msg: 'Loan not found' });

    // Make sure user owns Loan
    if (loan.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    loan = await Loan.findByIdAndUpdate(
      req.params.id,
      { $set: loanFields },
      { new: true }
    );
    res.json(loan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/loans/:id
// @desc    Delete an loan
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let loan = await Loan.findById(req.params.id);

    if (!loan) return res.status(404).json({ msg: 'Loan not found' });

    // Make sure user owns contact
    if (loan.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Loan.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Loan Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
