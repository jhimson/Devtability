const router = require('express').Router();
const {
  CreatePost,
  fetchUserPosts,
  fetchAllPosts,
  DeletePost,
  UpdatePost,
  toggleLike,
} = require('../controllers/C-post');
const { verify } = require('../utils/index');

router.get('/:userId', fetchUserPosts);
router.get('/', fetchAllPosts);
router.post('/', CreatePost);
router.delete('/', verify, DeletePost);
router.patch('/', verify, UpdatePost);
router.patch('/toggleLike', toggleLike);

module.exports = router;
