const express = require("express");
const protectroute = require("../middleware/authmiddleware");
const {
  getUser,
  getMessages,
  sendMessages,
} = require("../controllers/messageController");
const router = express.Router();
router.get("/users", protectroute, getUser);
router.get("/:id", protectroute, getMessages);
router.post("/send", protectroute, sendMessages);

module.exports = router;
