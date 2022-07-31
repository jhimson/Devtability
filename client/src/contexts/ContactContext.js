import React, { createContext, useState, useContext } from 'react';
import Axios from 'axios';
import { UserContext } from './UserContext';

export const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const getContacts = async () => {
    if (localStorage.getItem('contacts'))
      return JSON.parse(localStorage.getItem('contacts'));
  };

  const [contacts, setContacts] = useState(null);
  const [contact, setContact] = useState(user?._id);
  return (
    <ContactContext.Provider
      value={{ contacts, setContacts, contact, setContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
