const Message = require('../models/M-message');

// ? @Description    CREATE new message
// ? @Route          POST /api/messages
// ? @Access         Private / Authorized user
const createNewMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    if (savedMessage) res.status(200).json(savedMessage);
  } catch (error) {
    console.log(`Failed to insert/create new message. ErrorMessage: ${error}`);
    res.status(500).json({ Message: error });
  }
};

// ? @Description    Fetch messages
// ? @Route          GET /api/messages
// ? @Access         Private / Authorized user
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });

    if (messages) res.status(200).json(messages);
  } catch (error) {
    console.log(
      `Failed to fetch messages by conversationId. ErrorMessage: ${error}`
    );
    res.status(500).json({ Message: error });
  }
};

module.exports = { createNewMessage, getMessages };
