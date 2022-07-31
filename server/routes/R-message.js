const router = require('express').Router();
const {
    createNewMessage,
    getMessages,
} = require('../controllers/C-message');

router.post('/', createNewMessage);
router.get('/:conversationId', getMessages);

module.exports = router;
