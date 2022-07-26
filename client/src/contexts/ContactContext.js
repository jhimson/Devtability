import React, { createContext, useState, useContext } from 'react';
import Axios from 'axios';
import { UserContext } from './UserContext';

export const ContactContext = createContext();

const ContactContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const getContacts = async () => {
    if (localStorage.getItem('contacts'))
      return JSON.parse(localStorage.getItem('contacts'));

    const res = await Axios.get(
      `http://localhost:8000/api/contacts/${user?._id}`
    );
    return res.data;
  };

  const [contacts, setContacts] = useState(getContacts() || null);
  return (
    <ContactContext.Provider value={{ contacts, setContacts }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;
