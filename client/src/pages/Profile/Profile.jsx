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
import { addComment } from '../../utils/comments-api';
// ! ICONS
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';

import {
  getAccountabilityPartner,
  setAccountabilityPartner,
} from '../../utils/users-api';

// ! COMPONENTS
import Sidenav from '../../components/Sidenav/Sidenav';
import Comments from '../../components/Comments/Comments';
import Contacts from '../../components/Contacts/Contacts';
import ProfileInfo from '../../components/ProfileInfo/ProfileInfo';
import DeleteContactModal from '../../components/DeleteContactModal/DeleteContactModal';
import Partner from '../../components/Partner/Partner';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import PostForm from '../../components/PostForm/PostForm';
import NavHeader from '../../components/NavHeader/NavHeader';
import Posts from '../../components/Posts/Posts';

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
  const [partner, setPartner] = useState({});
  const [comment, setComment] = useState('');

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

  // ! COMMENTS ACTIONS
  const insertNewComment = async (userId, postId, text) => {
    const response = await addComment({ userId, postId, text });
    if (response) {
      console.log(`Successfully Added a new comment`, response);
      fetchPosts();
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

  const getPartner = async (userId) => {
    const response = await getAccountabilityPartner(userId);
    if (response) {
      setPartner(response?.data?.accountabilityPartner);
    }
  };

  const setUserPartner = async (userId, contactId) => {
    const response = await setAccountabilityPartner(userId, contactId);
    if (response) {
      console.log(`Successfully set accountability partner`);
    }
  };

  // ! PROPS
  const postFormProps = {
    isUpdating,
    setIsUpdating,
    handleSubmit,
    title,
    setTitle,
    todayText,
    setTodayText,
    tomorrowText,
    setTomorrowText,
    blockersText,
    setBlockersText,
    file,
    setFile,
  };

  const postProps = {
    user,
    posts,
    isUpdating,
    setIsUpdating,
    clearFields,
    updatePost,
    title,
    setTitle,
    todayText,
    setTodayText,
    tomorrowText,
    setTomorrowText,
    blockersText,
    setBlockersText,
    showOptions,
    setShowOptions,
    setUpdateData,
    deletePost,
    comment,
    Comments,
    fetchPosts,
    insertNewComment,
    setComment,
  };

  const contactsProps = {
    contacts,
    deleteContact,
    showModal,
    setShowModal,
    setUserPartner,
  };

  useEffect(() => {
    fetchPosts();
    getContacts(user?._id);
    getPartner(user?._id);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [isSubmitted, isUpdating]);

  useEffect(() => {
    getPartner(user?._id);
  }, [showModal]);

  return (
    <>
      <div className="min-h-screen bg-red-400">
        {/* <Sidenav /> */}
        <Main sidenav={<Sidenav />}>
          <NavHeader user={user} />
          <div>
            <article className="">
              <ProfileInfo user={user} />
              <Partner partner={partner} setShowModal={setShowModal} />
              <Contacts {...contactsProps} />
              <PostForm {...postFormProps} />
              <Posts {...postProps} />
            </article>
          </div>
        </Main>
      </div>
    </>
  );
};

export default Profile;
