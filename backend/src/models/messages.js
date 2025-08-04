const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true, ref: "User" },
    receiver: { type: String, required: true, ref: "User" },
    message: { type: String },
    Image: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Message", messageSchema);
