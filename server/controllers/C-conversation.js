const Conversation = require('../models/M-conversation');

// ? @Description    CREATE new conversation
// ? @Route          POST /api/conversations
// ? @Access         Private / Authorized user
const createNewConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    if (savedConversation) res.status(200).json(savedConversation);
  } catch (error) {
    console.log(
      `Failed to insert/create new converstion. ErrorMessage: ${error}`
    );
    res.status(500).json({ Message: error });
  }
};

// ? @Description    Fetch conversations
// ? @Route          GET /api/conversations
// ? @Access         Private / Authorized user
const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    if (conversations) res.status(200).json(conversations);
  } catch (error) {
    console.log(`Failed to fetch converstion. ErrorMessage: ${error}`);
    res.status(500).json({ Message: error });
  }
};

// ? @Description    Fetch conversations
// ? @Route          GET /api/conversations/:firstUserId/:secondUserId
// ? @Access         Private / Authorized user
const getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    if (conversation) res.status(200).json(conversation);
  } catch (error) {
    console.log(`Failed to fetch conversation. ErrorMessage: ${error}`);
    res.status(500).json({ Message: error });
  }
};

module.exports = { createNewConversation, getConversations, getConversation };
