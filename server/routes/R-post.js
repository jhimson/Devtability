const router = require('express').Router();
const { uploadImage, fetchPosts } = require('../controllers/C-post');
const { verify } = require('../utils/index');

router.post('/', uploadImage);
router.get('/:userId', fetchPosts);
// router.post('/logout', verify, Logout);

module.exports = router;
