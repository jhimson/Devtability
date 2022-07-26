import React, { useEffect, useState } from 'react';
import { format } from 'timeago.js';
import { useNavigate } from 'react-router-dom';

// ! ICONS
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';

//! API
import {
  createReply,
  deleteReply,
  editReply,
  toggleReplyLike,
} from '../../utils/replies-api';
import { fetchUser } from '../../utils/users-api';
import ReplyForm from '../ReplyForm/ReplyForm';

const Reply = ({
  comment,
  user,
  reply,
  getComment,
  setIsReplying,
  isReplying,
}) => {
  const [replyOptions, setReplyOptions] = useState(false);
  const [toggleReply, setToggleReply] = useState(false);
  const [replyComment, setReplyComment] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [updatingReply, setUpdatingReply] = useState(false);

  const navigate = useNavigate();

  //! FUNCTIONS
  const getUser = async (userId) => {
    const response = await fetchUser(userId);
    if (response) {
      console.log('zzzz', response);
      setCurrentUser(response.data);
    }
  };

  const removeReply = async (commentId, replyId) => {
    const response = await deleteReply({ commentId, replyId });
    if (response) {
      console.log(`Successfully removed a reply`);
      getComment();
    }
  };

  const updateReply = async (replyId, text) => {
    const response = await editReply({ replyId, text });
    if (response) {
      console.log('sucessfully updated reply', response);
      getComment();
      setUpdatingReply(false);
      // setCurrentUser(response.data);
    }
  };

  const togLike = async (userId, replyId) => {
    const response = await toggleReplyLike({ userId, replyId });
    if (response) {
      console.log(response);
      getComment();
    }
  };

  useEffect(() => {
    getUser(reply?.user);
  }, [comment]);

  return (
    <>
      <div>
        <div className="flex items-center space-x-4 mb-2">
          <div
            className="cursor-pointer"
            onClick={() => navigate(`/person-profile/${user?._id}`)}
          >
            <img className="w-8 h-8 rounded-full" src={user?.image} alt="" />
          </div>
          <div className="text-sm font-semibold">
            {currentUser?.name} •{' '}
            <span className="font-normal">
              {reply?.isEdited
                ? format(reply?.updated)
                : format(reply?.createdAt)}{' '}
              {reply?.isEdited && '(edited)'}
            </span>
          </div>
          {reply?.user === user?._id && (
            <div>
              <button
                className="relative z-10 flex items-center py-1 px-2 text-sm text-gray-600 rounded-full hover:bg-gray-200 focus:outline-none"
                onClick={() => {
                  setReplyOptions(!replyOptions);
                  //   setCurrentReply(reply?._id);
                  //   alert(reply?._id);
                }}
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
                  !replyOptions && 'hidden'
                }`}
              >
                <button
                  className="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white flex items-center space-x-2 font-bold w-full"
                  onClick={() => {
                    //   setUpdateComment(comment);
                    //   setUpdatingComment(true);
                    setUpdatingReply(true);
                    setReplyComment(reply?.text);
                    setReplyOptions(!replyOptions);
                  }}
                >
                  <FaEdit size={'1.3em'} />
                  <span>Edit Comment</span>
                </button>

                <button
                  className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white flex items-center space-x-2 font-bold cursor-pointer w-full"
                  onClick={() => {
                    // deletePost(post?._id)
                    //   deleteComment(postId, commentId);
                    console.log('teeezt', comment?._id, reply?._id);
                    removeReply(comment?._id, reply?._id);
                    setReplyOptions(!replyOptions);
                  }}
                >
                  <RiDeleteBin6Line size={'1.3em'} />
                  <span>Move to Trash</span>
                </button>
              </div>
            </div>
          )}
        </div>
        {updatingReply ? (
          <>
            <form
              className="w-full mt-2"
              onSubmit={(e) => {
                e.preventDefault();
                updateReply(reply?._id, replyComment);
                // updateComment(comment?._id, commentText);
                // setUpdatingComment(false);
              }}
            >
              <input
                type="text"
                className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                value={replyComment}
                onChange={(e) => setReplyComment(e.target.value)}
                style={{ borderRadius: '25px' }}
                placeholder="Post a comment..."
                autoComplete="off"
              />
            </form>
            {/* <div className="ml-8 mt-2">
              <Replies comment={comment} getComment={getComment} />
            </div> */}
          </>
        ) : (
          <>
            <p className="text-md text-gray-600 mt-2 mb-2 font-semibold">
              {reply?.text}
            </p>
            <div className="flex mb-2 space-x-2">
              <span
                className={`text-xs cursor-pointer ${
                  reply?.likes?.includes(user?._id)
                    ? 'text-white bg-blue-500'
                    : 'text-blue-500 bg-transparent'
                } border-2 border-blue-500 rounded py-1 px-2`}
                onClick={() => {
                  setToggleReply(!toggleReply);
                  togLike(user?._id, reply?._id);
                }}
              >
                Like
                {/* <span className="ml-2">2</span> */}
                <span className="inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-white bg-blue-800 rounded-full">
                  {reply?.likes?.length}
                </span>
              </span>

              <span
                className="text-xs text-white bg-gray-800 rounded py-1 px-2 cursor-pointer"
                onClick={() => setIsReplying(true)}
              >
                Reply
              </span>
            </div>
          </>
        )}
        {/* <ReplyForm isReplying={isReplying} setIsReplying={setIsReplying} /> */}
      </div>
      <hr className="my-2" />
    </>
  );
};

export default Reply;
