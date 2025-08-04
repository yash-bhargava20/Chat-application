const Message = require("../models/messages");
const User = require("../models/User");

exports.getUser = async (req, res) => {
  try {
    const myId = req.user._id;
    const users = await User.find({ _id: { $ne: myId } }).select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.sendMessages = async (req, res) => {
  try {
    const { receiver, message, Image } = req.body;
    const sender = req.user._id;
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
