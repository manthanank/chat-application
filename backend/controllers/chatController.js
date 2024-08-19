const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = await Message.create({
      sender: senderId,
      receiver: receiverId,
      content,
    });

    // Broadcast the message to the receiver
    req.io.emit("receiveMessage", message);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMessages = async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
