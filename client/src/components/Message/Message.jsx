import React, { useContext, useEffect, useState } from 'react';
import img1 from '../../assets/images/img.jpg';
import './message.css';
import { format } from 'timeago.js';

// ! API
import { fetchUser } from '../../utils/users-api';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const Message = ({ own, message }) => {
  const [sender, setSender] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const getSender = async (senderId) => {
    const response = await fetchUser(senderId);
    if (response) {
      setSender(response.data);
    }
  };

  useEffect(() => {
    getSender(message.sender)
  }, [message])
  
  return (
    <div className={`message ${own && 'own'}`}>
      <div className="messageTop">
        <img className="messageImg" src={own ? user?.image : sender?.image} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
