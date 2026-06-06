const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  const { receiverId, content, listingContextId } = req.body;
  try {
    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content,
      listingContext: listingContextId
    });
    const createdMessage = await message.save();
    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessages = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id }
      ]
    }).sort('createdAt');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMessage, getMessages };
