import React, { useEffect, useState } from 'react';
import './chatOnline.css';
import img from '../../assets/images/img.jpg';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [onlineFriends, setOnlineFriends] = useState([])

  useEffect(() => {
   
  }, [])
  
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img className="chatOnlineImg" src={img} alt="" />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">John Doe</span>
      </div>
    </div>
  );
};

export default ChatOnline;
