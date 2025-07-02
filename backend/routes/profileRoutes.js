const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

// GET /api/profile
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/profile
router.put('/', protect, async (req, res) => {
  const { phone, address, pincode } = req.body;
  try {
    await User.findByIdAndUpdate(req.user.id, { phone, address, pincode }, { new: true });
    res.json({ message: 'Profile updated' });
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// PUT /api/profile/password
router.put('/password', protect, async (req, res) => {
  const { password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(req.user.id, { password: hashed });
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(500).json({ message: 'Password update failed' });
  }
});

// DELETE /api/profile
router.delete('/', protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: 'Account deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Deletion failed' });
  }
});

module.exports = router;
