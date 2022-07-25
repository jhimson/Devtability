const router = require('express').Router();
const { createNewUser } = require('../controllers/C-user');

router.post('/', createNewUser);

module.exports = router;
