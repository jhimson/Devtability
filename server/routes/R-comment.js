const router = require('express').Router();
const {
  createComment,
  getComment,
  deleteComment,
} = require('../controllers/C-comment');
const { verify } = require('../utils/index');

router.post('/', createComment);

router.get('/:commentId', getComment);

router.delete('/:postId/:commentId', deleteComment);

module.exports = router;
