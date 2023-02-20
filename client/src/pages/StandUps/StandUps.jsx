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
  getAllPosts,
} from '../../utils/posts-api';
//
import { addComment } from '../../utils/comments-api';

// ! ICONS
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
// ! COMPONENTS
import Sidenav from '../../components/Sidenav/Sidenav';
import Comments from '../../components/Comments/Comments';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import NavHeader from '../../components/NavHeader/NavHeader';
import PostForm from '../../components/PostForm/PostForm';
import Posts from '../../components/Posts/Posts';

const StandUps = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //  ! STATES
  const [posts, setPosts] = useState([]);
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [todayText, setTodayText] = useState('');
  const [tomorrowText, setTomorrowText] = useState('');
  const [blockersText, setBlockersText] = useState('');
  const [comment, setComment] = useState('');

  const [showOptions, setShowOptions] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    const response = await getAllPosts();
    // setIsLoading(true);
    if (response) {
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 3000);
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

  const postsProps = {
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
    setComment,
    Comments,
    insertNewComment,
    fetchPosts,
    isLoading,
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [isSubmitted, isUpdating]);

  return (
    <>
      <div className="min-h-screen">
        {/* <Sidenav /> */}
        <Main sidenav={<Sidenav />}>
          {/* <NavHeader user={user} /> */}
          <div className="w-11/12 mx-auto">
            <article className="">
              <PostForm {...postFormProps} />
              <Posts {...postsProps} />
            </article>
          </div>
        </Main>
      </div>
    </>
  );
};

export default StandUps;
