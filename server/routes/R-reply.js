const router = require('express').Router();
const { createReply, deleteReply } = require('../controllers/C-reply');
const { verify } = require('../utils/index');

router.post('/', createReply);
router.delete('/:commentId/:replyId', deleteReply);

module.exports = router;
