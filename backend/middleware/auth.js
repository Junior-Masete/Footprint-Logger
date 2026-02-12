const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtKey = process.env.JWT_SECRET;

module.exports = function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({
    success: false,
    message: "no token available"
  });

  try {
    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
        success: false,
        message: "Not authorized"
    });
  }
};
