import React, { useEffect, useState, useContext } from 'react';
import { format } from 'timeago.js';

// ! API
import {
  fetchComment,
  removeComment,
  editComment,
  toggleCommentLike,
} from '../../utils/comments-api';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

// ! ICONS
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';

// ! COMPONENTS
import Replies from '../Replies/Replies';
import ReplyForm from '../ReplyForm/ReplyForm';

const Comments = ({ commentId, fetchPosts, postId }) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //! STATES
  const [comment, setComment] = useState({});
  const [commentText, setCommentText] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [updatingComment, setUpdatingComment] = useState(false);
  const [toggleLike, setToggleLike] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const getComment = async () => {
    const response = await fetchComment(commentId);
    if (response.data) {
      setComment(response.data);
    }
  };

  //! FUNCTIONS
  const deleteComment = async (postId, commentId) => {
    // await removePost(postId);
    // const updatedPosts = posts.filter((post) => post._id !== postId);
    // setPosts(updatedPosts);
    const response = await removeComment(postId, commentId);
    console.log(`Successfully Deleted a comment`, response);
    setShowOptions(!showOptions);
    fetchPosts();
  };

  const updateComment = async (commentId, text) => {
    const response = await editComment(commentId, text);
    if (response) {
      console.log(`Successfully Updated comment`);
      fetchPosts();
      getComment();
    }
  };

  const setUpdateComment = async (comment) => {
    setShowOptions(!showOptions);
    setCommentText(comment?.text);
  };

  const togLike = async (userId, commentId) => {
    const response = await toggleCommentLike({ userId, commentId });
    if (response) {
      console.log(response);
      getComment();
    }
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        setUpdatingComment(false);
        setIsReplying(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  useEffect(() => {
    getComment();
  }, [commentId, updatingComment]);

  return (
    <>
      <div className="w-full bg-gray-300 rounded-2xl px-6 py-4 shadow-lg hover:shadow-2xl transition duration-500 mb-4">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1036&q=80"
                  alt=""
                />
              </div>
              <div className="text-sm font-semibold">
                {comment?.user?.name} •{' '}
                <span className="font-normal">
                  {comment?.isEdited
                    ? format(comment?.updated)
                    : format(comment?.createdAt)}{' '}
                  {comment?.isEdited && '(edited)'}
                </span>
              </div>
              {comment?.user?._id === user?._id && (
                <div>
                  <button
                    className={`relative z-10 flex items-center py-1 px-2 text-sm text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none ${
                      showOptions && 'bg-gray-200'
                    }`}
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
                  <div
                    className={`absolute right-50 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-200 border-2 border-gray-300 ${
                      !showOptions && 'hidden'
                    }`}
                  >
                    <button
                      className="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white flex items-center space-x-2 font-bold w-full"
                      onClick={() => {
                        setUpdateComment(comment);
                        setUpdatingComment(true);
                      }}
                    >
                      <FaEdit size={'1.3em'} />
                      <span>Edit Comment</span>
                    </button>

                    <button
                      className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white flex items-center space-x-2 font-bold cursor-pointer w-full"
                      onClick={() => {
                        // deletePost(post?._id)
                        deleteComment(postId, commentId);
                      }}
                    >
                      <RiDeleteBin6Line size={'1.3em'} />
                      <span>Move to Trash</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/*  */}
          {updatingComment ? (
            <>
              <form
                className="w-full mt-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  updateComment(comment?._id, commentText);
                  setUpdatingComment(false);
                }}
              >
                <input
                  type="text"
                  className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  style={{ borderRadius: '25px' }}
                  placeholder="Post a comment..."
                  autoComplete="off"
                />
              </form>
              <div className="ml-8 mt-2">
                <Replies comment={comment} getComment={getComment} />
              </div>
            </>
          ) : (
            // ! HEEEEEEEEERE!!

            <div className="ml-8">
              <p className="text-md text-gray-600 mt-2 mb-2 font-semibold">
                {comment?.text}
              </p>
              <div className="flex mb-2 space-x-2">
                <span
                  className={`text-xs cursor-pointer ${
                    comment?.likes?.includes(user?._id)
                      ? 'text-white bg-blue-500'
                      : 'text-blue-500 bg-transparent'
                  } border-2 border-blue-500 rounded py-1 px-2`}
                  onClick={() => {
                    setToggleLike(!toggleLike);
                    togLike(user?._id, comment?._id);
                  }}
                >
                  Like
                  {/* <span className="ml-2">2</span> */}
                  <span className="inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-white bg-blue-800 rounded-full">
                    {comment?.likes?.length}
                  </span>
                </span>

                <span
                  className="text-xs text-white bg-gray-800 rounded py-1 px-2 cursor-pointer"
                  onClick={() => setIsReplying(!isReplying)}
                >
                  Reply
                  <span className="inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-white bg-gray-600 rounded-full">
                    {comment?.replies?.length}
                  </span>
                </span>
              </div>
              {/* NEW COMMENT INPUT FOR REPLY */}
              <ReplyForm
                isReplying={isReplying}
                setIsReplying={setIsReplying}
                user={user}
                comment={comment}
                getComment={getComment}
              />
              <Replies
                comment={comment}
                user={user}
                getComment={getComment}
                setIsReplying={setIsReplying}
                isReplying={isReplying}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Comments;
