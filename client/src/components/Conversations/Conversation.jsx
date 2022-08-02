import React, { useEffect, useState } from 'react';
import './conversation.css';
import img1 from '../../assets/images/img.jpg';
import noAvatar from '../../assets/images/noAvatar.png';
import Axios from 'axios';

const Conversation = ({ currentUser, conversation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ! Find member id that is not equal to the current user id logged in. >>> Chat/friend id
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );

    const getUser = async () => {
      try {
        const res = await Axios.get(
          `http://localhost:8000/api/users/${friendId}`
        );
        setUser(res.data);
      } catch (error) {
        console.log(`Failed to fetch user in DB. ErrorMessage: ${error}`);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation hover:bg-gray-300 rounded">
      <img
        className="conversationImg"
        src={user?.image ? user?.image : noAvatar}
        alt=""
      />
      <span className="conversationName">{user?.name}</span>
    </div>
  );
};

export default Conversation;
