// src/middlewares/auth.js
require("dotenv").config(); // safe if server also loads it
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed" });
    }

    const token = authHeader.split(" ")[1].trim();
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({ message: "Server config error" });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded; // decoded.userId, iat, exp
    console.log("Token verified for userId:", decoded.userId);
    return next();
  } catch (err) {
    console.warn("Token verification failed:", err.message);
    
  }
};

module.exports = authMiddleware;
