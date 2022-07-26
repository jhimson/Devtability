const router = require('express').Router();
const {
  CreatePost,
  fetchUserPosts,
  fetchAllPosts,
  DeletePost,
  UpdatePost,
} = require('../controllers/C-post');
const { verify } = require('../utils/index');

router.get('/:userId', fetchUserPosts);
router.get('/', fetchAllPosts);
router.post('/', CreatePost);
router.delete('/', verify, DeletePost);
router.patch('/', UpdatePost);

module.exports = router;
