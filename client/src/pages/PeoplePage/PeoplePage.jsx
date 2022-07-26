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

// ! ICONS
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
// ! COMPONENTS
import Sidenav from '../../components/Sidenav/Sidenav';
// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import Contacts from '../../components/Contacts/Contacts';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import PeopleList from '../../components/PeopleList/PeopleList';

const PeoplePage = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //  ! STATES
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [todayText, setTodayText] = useState('');
  const [tomorrowText, setTomorrowText] = useState('');
  const [blockersText, setBlockersText] = useState('');

  const [showOptions, setShowOptions] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

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

  useEffect(() => {
    fetchPosts();
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
          <div>
            <article className="">
              {/* CONTACTS STARTS -> */}
              <PeopleList />
              {/* CONTACTS END -> */}
            </article>
          </div>
        </Main>
        {/* <div>Welcome, {user.name}!</div> */}
      </div>
    </>
  );
};

export default PeoplePage;
