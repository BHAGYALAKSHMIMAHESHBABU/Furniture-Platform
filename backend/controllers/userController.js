const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken=require('../utils/generateToken')


// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const user = await User.create({ name, email, password });
    res.status(201).json({ token: generateToken(user._id) });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("📥 Login request received:", req.body);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Email not registered" });
    }

    console.log("✅ User found:", user);

    const isMatch = await user.matchPassword(password);

    console.log("🔐 Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

