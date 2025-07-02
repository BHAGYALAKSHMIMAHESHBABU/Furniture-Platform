const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded); // Add this
    req.user = decoded;
    next();
  } catch (err) {
    console.log("❌ Token error:", err.message);
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token has expired." });
    }
    return res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifyToken;
