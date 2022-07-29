const router = require('express').Router();
const {
  createReply,
  deleteReply,
  updateReply,
  toggleLike
} = require('../controllers/C-reply');
const { verify } = require('../utils/index');

router.post('/', createReply);
router.delete('/:commentId/:replyId', deleteReply);
router.patch('/', updateReply);
router.patch('/toggleLike', toggleLike);

module.exports = router;
