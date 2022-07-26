const router = require('express').Router();
const {
  addNewContact,
  getUserContacts,
  deleteContact,
} = require('../controllers/C-contact');

const { verify } = require('../utils/index');

router.post('/', addNewContact);
router.get('/:userId', getUserContacts);
router.delete('/:userId/:contactId', deleteContact);

module.exports = router;
