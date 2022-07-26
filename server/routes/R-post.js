const router = require('express').Router();
const {
  CreatePost,
  fetchUserPosts,
  fetchAllPosts,
  DeletePost,
  UpdatePost,
} = require('../controllers/C-post');
const { verify } = require('../utils/index');

router.get('/:userId', verify, fetchUserPosts);
router.get('/', verify, fetchAllPosts);
router.post('/', verify, CreatePost);
router.delete('/', verify, DeletePost);
router.patch('/', verify, UpdatePost);

module.exports = router;
