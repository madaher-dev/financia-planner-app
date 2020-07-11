const express = require('express');
const router = express.Router();

const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Asset = require('../modules/Asset');

// @route   GET api/assets
// @desc    Get all user's assets
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(assets);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/assets
// @desc    Add a new asset
// @access  Private
router.post(
  '/',
  [auth, [check('name', 'Please fill in a name').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, amount, type, returnValue } = req.body;

    try {
      const newAsset = new Asset({
        name,
        amount,
        type,
        returnValue,
        user: req.user.id,
      });

      const asset = await newAsset.save();

      res.json(asset);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/assets/:id
// @desc    Edit Asset
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, amount, type, returnValue } = req.body;
  const assetFields = {};
  if (name) assetFields.name = name;
  if (amount) assetFields.amount = amount;
  if (type) assetFields.type = type;
  if (returnValue) assetFields.returnValue = returnValue;

  try {
    let asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ msg: 'Asset not found' });

    // Make sure user owns asset
    if (asset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    asset = await Asset.findByIdAndUpdate(
      req.params.id,
      { $set: assetFields },
      { new: true }
    );
    res.json(asset);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/assets/:id
// @desc    Delete an asset
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let asset = await Asset.findById(req.params.id);

    if (!asset) return res.status(404).json({ msg: 'Asset not found' });

    // Make sure user owns asset
    if (asset.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    await Asset.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Asset Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
