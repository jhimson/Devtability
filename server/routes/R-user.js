const router = require('express').Router();
const { Signup, Login } = require('../controllers/C-user');

router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;
