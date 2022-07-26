const Contact = require('../models/M-contact');

// ? @Description    ADD New Contact
// ? @Route          POST /api/contacts
// ? @Access         Private / Authorized user
const addNewContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ user: req.body.userId });
    //! current's user id already exist in the contact collection, append the new contact to the array of contacts.
    if (contact) {
      // ! If contact id doesn't exist in the contact, append the contact id to the contacts array
      if (!contact.contacts.includes(req.body.contactId)) {
        contact.contacts.push(req.body.contactId);
        contact.save();
        res.status(200).json({ Message: `Successfully added new contact` });
      } else {
        res.status(500).json({ Message: 'Contact already exists!' });
      }
      // ! If current's user id doesn't exist in the contact collection, create a document to the collection.
    } else {
      const newContact = new Contact({
        user: req.body.userId,
        contacts: [req.body.contactId],
      });

      try {
        const savedContact = await newContact.save();
        if (savedContact) res.status(200).json(savedContact);
      } catch (error) {
        console.log(`Failed to insert/add new contact. ErrorMessage: ${error}`);
        res.status(500).json({ Message: error });
      }
    }
  } catch (error) {
    console.log(
      `Error finding user in the contacts collection. ErrorMessage:${error}`
    );
    res
      .status(500)
      .json({ Message: `Failed to find user in the contacts collection` });
  }
};

// ? @Description    Fetch all Contacts of current user
// ? @Route          POST /api/contacts/:userId
// ? @Access         Private / Authorized user
const getUserContacts = async (req, res) => {
  try {
    const contacts = await Contact.findOne({
      user: req.params.userId,
    }).populate('contacts');

    if (contacts) {
      console.log(contacts, 'BUGOK KA!');
      res.status(200).json(contacts);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(`Failed to fetch contacts. ErrorMessage: ${error}`);
    res.status(500).json({ Message: error });
  }
};

module.exports = { addNewContact, getUserContacts };
