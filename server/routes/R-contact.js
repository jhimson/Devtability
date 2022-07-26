const router = require('express').Router();
const { addNewContact, getUserContacts } = require('../controllers/C-contact');

router.post('/', addNewContact);
router.get('/:userId', getUserContacts);

module.exports = router;
