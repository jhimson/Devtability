const router = require('express').Router();
const {
  CreatePost,
  fetchUserPosts,
  fetchAllPosts,
  DeletePost,
} = require('../controllers/C-post');
const { verify } = require('../utils/index');

router.get('/:userId', fetchUserPosts);
router.get('/', fetchAllPosts);
router.post('/', CreatePost);
router.delete('/', DeletePost);

module.exports = router;
