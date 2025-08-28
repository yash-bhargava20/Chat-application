const jwt = require("jsonwebtoken");
const User = require("../models/User");
const protectroute = async (req, res, next) => {
  const authHeader = req.headers?.authorization || "";
  const bearertoken = authHeader.startsWith("Bearer")
    ? authHeader.slice(7)
    : null;
  const token = bearertoken || req.cookies?.token;
  if (!token) return res.status(401).json({ error: "Token is not available" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: "Invalid Token" });
  }
};
module.exports = protectroute;
