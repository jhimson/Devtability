const router = require('express').Router();
const {
  createNewConversation,
  getConversations,
} = require('../controllers/C-conversation');

router.post('/', createNewConversation);
router.get('/:userId', getConversations);

module.exports = router;
