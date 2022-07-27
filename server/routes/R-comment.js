const router = require('express').Router();
const { createComment, getComment } = require('../controllers/C-comment');
const { verify } = require('../utils/index');

router.post('/', createComment);

router.get('/:commentId', getComment);

module.exports = router;
