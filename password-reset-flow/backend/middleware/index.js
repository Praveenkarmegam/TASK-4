const jwt = require("jsonwebtoken");
const User = require("../model/index");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Missing Token" });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Attach user to the request and proceed to the next middleware
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
