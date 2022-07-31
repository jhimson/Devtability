/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState, useRef } from 'react';
import Axios from 'axios';
import io from 'socket.io-client';
import Main from '../../components/Main/Main';


// ! API
import { removeContact } from '../../utils/contacts-api';

// ! COMPONENTS
import Sidenav from '../../components/Sidenav/Sidenav';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import Conversation from '../../components/Conversations/Conversation';
import Message from '../../components/Message/Message';
import './messenger.css';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import PeopleList from '../../components/PeopleList/PeopleList';

const Messenger = () => {
  const ENDPOINT = "https://devtability-socket.herokuapp.com"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //  ! STATES
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  //  ! To always have the current socket id
  const socket = useRef();
  //! Use to scroll to the current message
  const scrollRef = useRef();

  const test = useRef({});

  //   ! FUNCTIONS
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    // ! Traverse through the array of current chat members and check if which one is not equal to the current user id, then that will be the receiver of the message.
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    //! Sends message to the server using socket.emit
    socket.current?.emit('sendMessage', {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await Axios.post(
        `https://devtability.herokuapp.com/api/messages/`,
        message
      );
      //! Append newMessage to messages state
      if (res.data) setMessages((prevState) => [...prevState, res.data]);
      setNewMessage('');
    } catch (error) {
      console.log(
        `Failed to insert/create new message in DB. ErrorMessage: ${error}`
      );
    }
  };

  //! USE EFFECTS

  useEffect(() => {
    //! Connects to the websocket server @ port 8900
    // socket.current = io('ws://localhost:5000');
    socket.current = io(ENDPOINT);

    //! Whenever the user receives a message, it will set the state of the arrivalMessage.
    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  //! Whenever an arrival message change
  useEffect(() => {
    // ! Logic to make sure the only correct receiver will receive the message.
    // ! If the sender id is a member in the currentChat, then add the message to the messages array state.
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prevState) => [...prevState, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    //! Send the server this data -> user_.id using socket.emit
    console.log('SUCKS!', user._id);
    socket.current.emit('addUser', user._id);
    // ! Receive the users array from the server.
    socket.current.on('getUsers', (users) => {
      // ! Sets the state of onlineUsers to all the users connected to the server
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    // ! Take data/message from server using socket.on
    socket.current?.on('welcome', (message) => {
      console.log(message);
    });
  }, [socket]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await Axios.get(
          `https://devtability.herokuapp.com/api/conversations/${user._id}`
        );
        setConversations(res.data);
      } catch (error) {
        console.log(`Error fetching conversations. ErrorMessage: ${error}`);
      }
    };
    getConversations();
  }, [user]);

  // ! Fetch messages of the currentChat/conversation using currentChat._id
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await Axios.get(
          `https://devtability.herokuapp.com/api/messages/${currentChat?._id}`
        );
        setMessages(res.data);
      } catch (error) {
        console.log(
          `Failed to fetch messages of current converstion. ErrorMessage: ${error}`
        );
      }
    };
    getMessages();
  }, [currentChat]);

  //! To scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <div className="min-h-screen bg-red-400">
        {/* <Sidenav /> */}
        <Main sidenav={<Sidenav />}>
          <nav className="flex items-center justify-between px-4 bg-white py-6 border-b">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-1/8">
              <input
                type="text"
                placeholder="search"
                className="bg-gray-100 outline-none w-full"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="flex items-center space-x-4">
              <img
                className="w-8 rounded-full"
                src="https://imagez.tmz.com/image/f7/1by1/2021/12/14/f7703994b69d48ca802df55729a2325c_xl.jpg"
                alt="Elon Musk"
              />
              <p className="hidden md:block">{user?.name}</p>
            </div>
          </nav>
          <div className="messenger">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
                <input
                  type="text"
                  placeholder="Search for friends"
                  className="chatMenuInput"
                />
                {conversations?.map((convo) => (
                  // ! Sets the currentChat
                  <div onClick={() => setCurrentChat(convo)}>
                    <Conversation
                      key={convo._id}
                      conversation={convo}
                      currentUser={user}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="chatBox">
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop">
                      {messages?.map((message) => (
                        <div ref={scrollRef}>
                          <Message
                            message={message}
                            // ! To check if the owner of the message is the current user logged in. Owner will be equals to true
                            own={message.sender === user._id}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="Write something..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      ></textarea>
                      <button
                        className="chatSubmitButton"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="noConversationText">
                    Open a conversation to start a chat
                  </span>
                )}
              </div>
            </div>
            <div className="chatOnline">
              <div className="onlineWrapper">
                <ChatOnline
                  onlineUsers={onlineUsers}
                  currentId={user._id}
                  setCurrentChat={setCurrentChat}
                />
              </div>
            </div>
          </div>
        </Main>
      </div>
    </>
  );
};

export default Messenger;
