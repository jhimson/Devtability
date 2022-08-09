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
import PostForm from '../../components/PostForm/PostForm';
import NavHeader from '../../components/NavHeader/NavHeader';
import Posts from '../../components/Posts/Posts';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import { ContactContext } from '../../contexts/ContactContext';

const UserProfile = () => {
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
  const [isLoading, setIsLoading] = useState(true);

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
    // setIsLoading(true);
    if (response) {
      setTimeout(() => {
        // setIsLoading(false);
      }, 3000);
      setPosts(response.data);
    }
  };

  const deletePost = async (postId) => {
    await removePost(postId);
    const updatedPosts = posts.filter((post) => post._id !== postId);
    // setIsLoading(true);
    if (updatedPosts) {
      // setIsLoading(false);
      setPosts(updatedPosts);
      setShowOptions(!showOptions);
    }
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
    // setIsLoading(true);
    if (response) {
      // setIsLoading(false);
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
    // setIsLoading(true);
    if (response) {
      // setIsLoading(false);
      if (contactId === partner?._id) {
        // 62e12168650f328749d4713c
        //! If the current partner is being deleted from the contact, automatically set admin as the partner.
        setUserPartner(user?._id, '62e5d02994bd214f8966cdec');
        getPartner(user?._id);
      }
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
    // setIsLoading(true);
    if (response) {
      // setIsLoading(false);
      getPartner(userId);
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
    isLoading,
  };

  const contactsProps = {
    contacts,
    deleteContact,
    showModal,
    setShowModal,
    setUserPartner,
    partner,
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
      <div className="min-h-screen">
        {/* <Sidenav /> */}
        <Main sidenav={<Sidenav />}>
          {/* <NavHeader user={user} /> */}
          <div className="w-11/12 mx-auto mt-4">
            <article className="">
              <ProfileInfo user={user} setUser={setUser} userLoggedIn={user} />
              <Partner partner={partner} setShowModal={setShowModal} />
              <Contacts {...contactsProps} />
              <PostForm {...postFormProps} />
              {/* <Posts {...postProps} /> */}
              {posts?.length ? (
                <Posts {...postProps} />
              ) : (
                <div className="bg-white shadow mt-6 rounded-lg p-10 border-2 border-gray-50 mb-8">
                  <h1 className="text-4xl text-center text-gray-400">
                    You currently don't have any posts!{' '}
                  </h1>
                </div>
              )}
            </article>
          </div>
        </Main>
      </div>
    </>
  );
};

export default UserProfile;
