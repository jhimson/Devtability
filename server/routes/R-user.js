const router = require('express').Router();
const { Signup, Login, Logout } = require('../controllers/C-user');
const { verify } = require('../utils/index');

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', verify, Logout);

module.exports = router;
