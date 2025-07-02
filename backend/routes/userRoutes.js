const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');

router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

module.exports = router;
