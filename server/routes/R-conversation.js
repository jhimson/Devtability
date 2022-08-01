const router = require('express').Router();
const {
  createNewConversation,
  getConversations,
  getConversation,
} = require('../controllers/C-conversation');

router.post('/', createNewConversation);
router.get('/:userId', getConversations);
router.get('/:firstUserId/:secondUserId', getConversation);

module.exports = router;
