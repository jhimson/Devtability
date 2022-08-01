import React, { useEffect, useState, useContext } from 'react';
import './chatOnline.css';
import img from '../../assets/images/img.jpg';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

import { getUserContacts } from '../../utils/contacts-api';
import { fetchUser } from '../../utils/users-api';
import { fetchConversation } from '../../utils/conversations-api';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  const [contacts, setContacts] = useState([]);
  const [onlineContacts, setOnlineContacts] = useState([]);
  const [offlineContacts, setOfflineContacts] = useState([]);

  const fetchContacts = async (userId) => {
    const response = await getUserContacts(userId);
    if (response) {
      console.log(response?.contacts);
      setContacts(response?.contacts);
    }
  };

  const handleClick = async (user) => {
    const response = await fetchConversation(currentId, user?._id);
    console.log(response);
    setCurrentChat(response.data);
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

    setOfflineContacts(
      contacts.filter((contact) => !onlineContactsId.includes(contact?._id))
    );
  }, [contacts, onlineUsers]);

  return (
    <div className="flex flex-col space-y-10">
      <div>
        <h1 className='bg-gray-300 py-2 px-4 font-bold rounded-lg'>Online Contacts</h1>
        <div className="chatOnline px-2">
          {onlineContacts?.map((online) => (
            <div
              className="chatOnlineFriend"
              onClick={() => handleClick(online)}
            >
              <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src={online?.image} alt="" />
                <div className="chatOnlineBadge"></div>
              </div>
              <span className="chatOnlineName">{online?.name}</span>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <h1 className='bg-gray-300 py-2 px-4 font-bold rounded-lg'>Offline Contacts</h1>
        <div className="chatOnline px-2">
          {offlineContacts?.map((online) => (
            <div
              className="chatOnlineFriend"
              onClick={() => handleClick(online)}
            >
              <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg" src={online?.image} alt="" />
                {/* <div className="chatOnlineBadge"></div> */}
              </div>
              <span className="chatOnlineName">{online?.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatOnline;
