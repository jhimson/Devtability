const router = require('express').Router();
const {
  Signup,
  Login,
  Logout,
  fetchUsersExceptCurrentUser,
  setAccountabilityPartner,
  fetchUser,
} = require('../controllers/C-user');
const { verify } = require('../utils/index');

router.get('/:userId', fetchUser);
router.get('/except/:userId', fetchUsersExceptCurrentUser);

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', verify, Logout);

router.patch('/partner', setAccountabilityPartner);

module.exports = router;
