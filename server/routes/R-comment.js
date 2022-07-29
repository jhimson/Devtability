const router = require('express').Router();
const {
  createComment,
  getComment,
  deleteComment,
  updateComment,
  toggleLike,
} = require('../controllers/C-comment');
const { verify } = require('../utils/index');

router.post('/', createComment);

router.get('/:commentId', getComment);

router.delete('/:postId/:commentId', deleteComment);

router.patch('/', updateComment);

router.patch('/toggleLike', toggleLike);

module.exports = router;
