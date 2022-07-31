import React from 'react';
import img1 from '../../assets/images/img.jpg';
import './message.css';
import { format } from 'timeago.js';

const Message = ({ own, message }) => {
  return (
    <div className={`message ${own && 'own'}`}>
      <div className="messageTop">
        <img className="messageImg" src={img1} alt="" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
