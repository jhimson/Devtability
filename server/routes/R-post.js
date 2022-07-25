const router = require('express').Router();
const { uploadImage, fetchUserPosts, fetchAllPosts } = require('../controllers/C-post');
const { verify } = require('../utils/index');

router.get('/:userId', fetchUserPosts);
router.get('/', fetchAllPosts);
router.post('/', uploadImage);



module.exports = router;
