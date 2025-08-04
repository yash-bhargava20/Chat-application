const express = require("express");
const {
  signup,
  login,
  updateProfile,
  getMe,
  logout,
} = require("../controllers/authController");
const protectedroute = require("../middleware/authmiddleware");
const router = express.Router();
router.post("/signup", signup);

router.post("/login", login);
router.put("/update", protectedroute, updateProfile);
router.get("/profile", protectedroute, getMe);
router.get("/logout", protectedroute, logout);

module.exports = router;
