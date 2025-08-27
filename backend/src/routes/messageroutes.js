const express = require("express");
const protectroute = require("../middleware/authmiddleware");
const {
  getUser,
  getMessages,
  sendMessages,
  deleteMessage,
} = require("../controllers/messageController");
const router = express.Router();
router.get("/users", protectroute, getUser);
router.get("/:id", protectroute, getMessages);
router.post("/send", protectroute, sendMessages);
router.delete("/:id", protectroute, deleteMessage);

module.exports = router;
