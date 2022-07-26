/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react';
import Axios from 'axios';
import { format } from 'timeago.js';
import Main from '../../components/Main/Main';

// ! API
import {
  getUserPosts,
  createPost,
  removePost,
  editPost,
} from '../../utils/posts-api';

import { getUserContacts, removeContact } from '../../utils/contacts-api';

// ! ICONS
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
// ! COMPONENTS
import Sidenav from '../../components/Sidenav/Sidenav';
// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import Contacts from '../../components/Contacts/Contacts';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import DeleteContactModal from '../../components/DeleteContactModal/DeleteContactModal';

const Profile = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //  ! STATES
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [todayText, setTodayText] = useState('');
  const [tomorrowText, setTomorrowText] = useState('');
  const [blockersText, setBlockersText] = useState('');
  const [contacts, setContacts] = useState([]);

  const [showOptions, setShowOptions] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showModal, setShowModal] = useState(false);

  //   ! FUNCTIONS
  const clearFields = () => {
    setTitle('');
    setTodayText('');
    setTomorrowText('');
    setBlockersText('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('data', file);
    formData.append('user', `${user._id}`);
    formData.append('title', `${title}`);
    formData.append('todayText', `${todayText}`);
    formData.append('tomorrowText', `${tomorrowText}`);
    formData.append('blockersText', `${blockersText}`);

    const response = await createPost(formData);
    if (response) {
      clearFields();
      console.log(response);
      setIsSubmitted(!isSubmitted);
    }
  };

  const fetchPosts = async () => {
    const response = await getUserPosts(user._id);
    if (response) {
      setPosts(response.data);
    }
  };

  const deletePost = async (postId) => {
    await removePost(postId);
    const updatedPosts = posts.filter((post) => post._id !== postId);
    setPosts(updatedPosts);
    setShowOptions(!showOptions);
  };

  const setUpdateData = async (post) => {
    console.log('WTF DUDE!');
    setShowOptions(!showOptions);
    setIsUpdating(true);
    setFile(post.image);
    setTitle(post.title);
    setTodayText(post.todayText);
    setTomorrowText(post.tomorrowText);
    setBlockersText(post.blockersText);
  };

  const updatePost = async (updatedPost) => {
    const response = await editPost(updatedPost);
    if (response) {
      console.log(`Successfully updated post`, response);
    }
  };

  // ! CONTACTS FUNCTIONS
  const getContacts = async (userId) => {
    const response = await getUserContacts(userId);
    if (response) {
      setContacts(response.contacts);
    }
  };

  const deleteContact = async (userId, contactId) => {
    const response = await removeContact(userId, contactId);
    if (response) {
      console.log(`Successfully deleted contact`, response);
    }
    let updatedContacts = contacts?.filter(
      (contact) => contact._id !== contactId
    );
    setContacts(updatedContacts);
  };

  useEffect(() => {
    fetchPosts();
    getContacts(user?._id);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [isSubmitted, isUpdating]);

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
          {/* HEREE ->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
          <div>
            <article className="">
              {/* PROFILE INFO START -> */}
              <ProfileInfo name={user?.name} email={user?.email} />
              {/* PROFILE INFO END -> */}

              {/* CONTACTS STARTS -> */}
              <Contacts
                contacts={contacts}
                deleteContact={deleteContact}
                showModal={showModal}
                setShowModal={setShowModal}
              />
              {/* CONTACTS END -> */}
              {!isUpdating && (
                <form
                  onSubmit={handleSubmit}
                  className="bg-white shadow rounded-lg mb-6 p-4"
                >
                  <div className="flex flex-col space-y-2 mb-8">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Title
                    </label>
                    <textarea
                      name="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Type something here..."
                      className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-3 gap-x-8">
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="todayText"
                        className="text-gray-500 font-semibold"
                      >
                        What did you worked on today?
                      </label>
                      <textarea
                        name="todayText"
                        value={todayText}
                        onChange={(e) => setTodayText(e.target.value)}
                        placeholder="Type something here..."
                        className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                      ></textarea>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="tomorrowText"
                        className="text-gray-500 font-semibold"
                      >
                        What are you planning to work on tonight/tomorrow?
                      </label>
                      <textarea
                        name="tomorrowText"
                        value={tomorrowText}
                        onChange={(e) => setTomorrowText(e.target.value)}
                        placeholder="Type something here..."
                        className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                      ></textarea>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label
                        htmlFor="blockersText"
                        className="text-gray-500 font-semibold"
                      >
                        What blockers do you have?
                      </label>
                      <textarea
                        name="blockersText"
                        value={blockersText}
                        onChange={(e) => setBlockersText(e.target.value)}
                        placeholder="Type something here..."
                        className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 bg-gray-100 p-4 mt-6 rounded w-full">
                    <label htmlFor="" className="text-gray-500 font-semibold">
                      Upload image
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <footer className="flex justify-between mt-2">
                    <div className="flex gap-2">
                      <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1"
                        >
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          ></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </span>
                      <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </span>
                      <span className="flex items-center transition ease-out duration-300 hover:bg-blue-500 hover:text-white bg-blue-100 w-8 h-8 px-2 rounded-full text-blue-400 cursor-pointer">
                        <svg
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1"
                        >
                          <polyline points="4 17 10 11 4 5"></polyline>
                          <line x1="12" y1="19" x2="20" y2="19"></line>
                        </svg>
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="flex items-center py-2 px-4 rounded-lg text-sm bg-blue-600 text-white shadow-lg w-28 justify-center"
                    >
                      Post
                      <svg
                        className="ml-1"
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </button>
                  </footer>
                </form>
              )}

              <div className="bg-white shadow rounded-lg">
                {posts?.map((post) => {
                  return (
                    <>
                      <div className="flex flex-row px-2 py-3 mx-3 justify-between">
                        <div className="flex">
                          <div className="w-auto h-auto rounded-full border-2 border-green-500">
                            <img
                              className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                              alt="User avatar"
                              src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=200&amp;q=200"
                            />
                          </div>
                          <div className="flex flex-col mb-2 ml-4 mt-1">
                            <div className="text-gray-600 text-sm font-semibold">
                              {post?.user?.name}
                            </div>
                            <div className="flex w-full mt-1">
                              <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                                Software Engineer
                              </div>
                              <div className="text-gray-400 font-thin text-xs">
                                • {format(post?.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center">
                          <div className="relative inline-block">
                            <div className="flex space-x-4">
                              {isUpdating && (
                                <>
                                  <button
                                    className="py-2 px-4 rounded-lg text-sm bg-green-600 text-white shadow-lg"
                                    onClick={() => {
                                      clearFields();
                                      setIsUpdating(false);
                                      updatePost({
                                        _id: post?._id,
                                        title,
                                        todayText,
                                        tomorrowText,
                                        blockersText,
                                      });
                                    }}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="py-2 px-4 rounded-lg text-sm bg-red-600 text-white shadow-lg"
                                    onClick={() => {
                                      clearFields();
                                      setIsUpdating(false);
                                    }}
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                              {!isUpdating && (
                                <button
                                  className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white rounded-full focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white hover:bg-gray-200 focus:outline-none"
                                  onClick={() => setShowOptions(!showOptions)}
                                >
                                  <svg
                                    className="w-6 h-6 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                    ></path>
                                  </svg>
                                </button>
                              )}
                            </div>

                            <div
                              className={`absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-200 border-2 border-gray-300 ${
                                !showOptions && 'hidden'
                              }`}
                            >
                              <button
                                className="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white flex items-center space-x-2 font-bold w-full"
                                onClick={() => {
                                  setUpdateData(post);
                                }}
                              >
                                <FaEdit size={'1.3em'} />
                                <span>Edit Post</span>
                              </button>

                              <button
                                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white flex items-center space-x-2 font-bold cursor-pointer w-full"
                                onClick={() => deletePost(post?._id)}
                              >
                                <RiDeleteBin6Line size={'1.3em'} />
                                <span>Move to Trash</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-b border-gray-100"></div>
                      <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2 grid grid-cols-1 grid-row-auto gap-2">
                        <img className="rounded w-full" src={post?.image} />
                      </div>
                      <div className="text-gray-600 font-bold mb-4 mx-3 px-2 text-2xl">
                        {isUpdating ? (
                          <>
                            <h1 className="text-gray-500 font-semibold mb-4 text-5xl">
                              Editing Post
                            </h1>
                            <hr className="mb-4" />
                            <label
                              htmlFor=""
                              className="text-gray-500 font-semibold"
                            >
                              Title
                            </label>
                            <textarea
                              name="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="Type something here..."
                              className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 font-normal h-auto"
                            ></textarea>
                          </>
                        ) : (
                          post?.title
                        )}
                      </div>
                      <div className="text-gray-500 text-lg mb-6 mx-3 px-2">
                        <h1 className="font-semibold">
                          What did you worked on today?
                        </h1>
                        {isUpdating ? (
                          <textarea
                            name="todayText"
                            value={todayText}
                            onChange={(e) => setTodayText(e.target.value)}
                            placeholder="Type something here..."
                            className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 h-24"
                          ></textarea>
                        ) : (
                          post?.todayText
                        )}
                      </div>
                      <div className="text-gray-500 text-lg mb-6 mx-3 px-2">
                        <h1 className="font-semibold">
                          What are you planning to work on tonight/tomorrow?
                        </h1>
                        {isUpdating ? (
                          <textarea
                            name="tomorrowText"
                            value={tomorrowText}
                            onChange={(e) => setTomorrowText(e.target.value)}
                            placeholder="Type something here..."
                            className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 h-24"
                          ></textarea>
                        ) : (
                          post?.tomorrowText
                        )}
                      </div>
                      <div className="text-gray-500 text-lg mb-6 mx-3 px-2">
                        <h1 className="font-semibold">
                          What blockers do you have?
                        </h1>
                        {isUpdating ? (
                          <textarea
                            name="blockersText"
                            value={blockersText}
                            onChange={(e) => setBlockersText(e.target.value)}
                            placeholder="Type something here..."
                            className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 h-24"
                          ></textarea>
                        ) : (
                          post?.blockersText
                        )}
                      </div>

                      <div className="flex justify-start mb-4 border-t border-gray-100">
                        <div className="flex w-full mt-1 pt-2 pl-5">
                          <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              width="14px"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                              ></path>
                            </svg>
                          </span>
                          <img
                            className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                            alt=""
                          />
                          <img
                            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                            alt=""
                          />
                          <img
                            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=634&amp;q=80"
                            alt=""
                          />
                          <img
                            className="inline-block object-cover w-8 h-8 -ml-2 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2.25&amp;w=256&amp;h=256&amp;q=80"
                            alt=""
                          />
                        </div>
                        <div className="flex justify-end w-full mt-1 pt-2 pr-5">
                          <span className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center rounded-full text-blue-400 cursor-pointer mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              width="14px"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                              ></path>
                            </svg>
                          </span>
                          <span className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-2 py-2 text-center rounded-full text-gray-100 cursor-pointer">
                            <svg
                              className="h-4 w-4 text-red-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full border-t border-gray-100">
                        <div className="mt-3 mx-5 flex flex-row text-xs">
                          <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                            Comments:
                            <div className="ml-1 text-gray-400 text-ms">30</div>
                          </div>
                          <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
                            Views:
                            <div className="ml-1 text-gray-400 text-ms">
                              60k
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 mx-5 w-full flex justify-end text-xs">
                          <div className="flex text-gray-700 rounded-md mb-2 mr-4 items-center">
                            Likes:
                            <div className="ml-1 text-gray-400 text-ms">
                              120k
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex items-center self-center w-full p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
                        <img
                          className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                          alt="User avatar"
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                          <button
                            type="submit"
                            className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500"
                          >
                            <svg
                              className="w-6 h-6 transition ease-out duration-300 hover:text-blue-500 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              ></path>
                            </svg>
                          </button>
                        </span>
                        <input
                          type="search"
                          className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                          style={{ borderRadius: '25px' }}
                          placeholder="Post a comment..."
                          autoComplete="off"
                        />
                      </div>
                    </>
                  );
                })}
              </div>
            </article>
          </div>
        </Main>
        {/* <div>Welcome, {user.name}!</div> */}
      </div>
    </>
  );
};

export default Profile;
