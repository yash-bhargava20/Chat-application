const Message = require("../models/messages");
const User = require("../models/User");
const cloudinary = require("cloudinary").v2;

exports.getUser = async (req, res) => {
  try {
    const myId = req.user._id;
    const users = await User.find({ _id: { $ne: myId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.sendMessages = async (req, res) => {
  try {
    const { receiver, message, Image } = req.body;
    const sender = req.user._id;
    let imageUrl = null;
    if (Image) {
      const result = await cloudinary.uploader.upload(Image, {
        folder: "chat_images",
      });
    }
    imageUrl = result.secure_url;
    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      Image,
    });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { id: userToChatid } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: userToChatid },
        { sender: userToChatid, receiver: myId },
      ],
    }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndDelete(id);
    if (!message) {
      return res.status(404).json({ error: "Message not found" });
    }
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    console.error("Delete message error:", err);
    res.status(500).json({ error: err.message });
  }
};
