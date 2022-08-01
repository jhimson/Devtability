import React, { useEffect, useState, useContext } from 'react';
import './chatOnline.css';
import img from '../../assets/images/img.jpg';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

import { getUserContacts } from '../../utils/contacts-api';
import { fetchUser } from '../../utils/users-api';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [onlineContacts, setOnlineContacts] = useState([]);

  const fetchContacts = async (userId) => {
    const response = await getUserContacts(userId);
    if (response) {
      console.log(response?.contacts);
      setContacts(response?.contacts);
    }
  };

  useEffect(() => {
    fetchContacts(currentId);
  }, [currentId]);

  useEffect(() => {
    // ! Only get the userId.
    const onlineContactsId = onlineUsers.map((online) => {
      return online?.userId;
    });
    //! Filters the online contacts
    setOnlineContacts(
      contacts.filter((contact) => onlineContactsId.includes(contact?._id))
    );
  }, [contacts, onlineUsers]);

  return (
    <div className="chatOnline">
      {onlineContacts?.map((online) => (
        <div className="chatOnlineFriend" onClick={() => alert(online?.name)}>
          <div className="chatOnlineImgContainer">
            <img className="chatOnlineImg" src={online?.image} alt="" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{online?.name}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
