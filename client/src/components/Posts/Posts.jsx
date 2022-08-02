import React, { useState, useContext } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import ReactLoading from 'react-loading';
import { format } from 'timeago.js';
// ! ICONS
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import Comments from '../Comments/Comments';

import { toggleLike } from '../../utils/posts-api';

import { useNavigate } from 'react-router-dom';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';
import LoadingModal from '../LoadingModal/LoadingModal';

const Posts = ({ ...postProps }) => {
  const [totalComments, setTotalComments] = useState(0);
  const navigate = useNavigate();
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  const [currentPost, setCurrentPost] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const togLike = async (userId, postId) => {
    const response = await toggleLike({ userId, postId });
    if (response) {
      console.log(response);
      postProps.fetchPosts();
    }
  };

  return (
    <>
      <div className="bg-gray-200 shadow rounded-lg">
        {postProps?.isLoading ? (
          <LoadingModal isLoading={postProps?.isLoading} />
        ) : (
          <>
            {postProps.posts?.map((post) => {
              return (
                <>
                  <div className="flex flex-row px-2 py-3 mx-3 justify-between mt-4">
                    <div className="flex">
                      <div
                        className="w-auto h-auto rounded-full border-2 border-gray-400"
                        onClick={() =>
                          navigate(`/person-profile/${post?.user?._id}`)
                        }
                      >
                        <img
                          className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                          alt="User avatar"
                          src={post?.user?.image}
                        />
                      </div>
                      <div className="flex flex-col mb-2 ml-4 mt-1">
                        <div className="text-gray-600 text-sm font-semibold">
                          {post?.user?.name}
                        </div>
                        <div className="flex w-full mt-1">
                          <div className="text-blue-700 font-base text-xs mr-1 cursor-pointer">
                            {post?.user?.title}
                          </div>
                          <div className="text-gray-400 font-thin text-xs">
                            •{' '}
                            {post?.isEdited
                              ? format(post?.updated)
                              : format(post?.createdAt)}{' '}
                            {post?.isEdited && '(edited)'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="relative inline-block">
                        <div className="flex space-x-4">
                          {postProps.isUpdating &&
                            post?.user?._id === postProps.user._id &&
                            post?._id === currentPost && (
                              <>
                                <button
                                  className="py-2 px-4 rounded-lg text-sm bg-green-600 text-white shadow-lg"
                                  onClick={() => {
                                    postProps.clearFields();
                                    postProps.setIsUpdating(false);
                                    postProps.updatePost({
                                      _id: post?._id,
                                      title: postProps.title,
                                      todayText: postProps.todayText,
                                      tomorrowText: postProps.tomorrowText,
                                      blockersText: postProps.blockersText,
                                    });
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  className="py-2 px-4 rounded-lg text-sm bg-red-600 text-white shadow-lg"
                                  onClick={() => {
                                    postProps.clearFields();
                                    postProps.setIsUpdating(false);
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                          {post?.user?._id === postProps.user._id &&
                            !postProps.isUpdating && (
                              <button
                                className="relative z-10 flex items-center p-2 text-sm text-gray-600 bg-white rounded-full focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:text-white hover:bg-gray-200 focus:outline-none"
                                onClick={() => {
                                  postProps.setShowOptions(
                                    !postProps.showOptions
                                  );
                                  setCurrentPost(post?._id);
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
                            )}
                        </div>

                        <div
                          className={`absolute right-0 z-20 w-56 py-2 mt-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-200 border-2 border-gray-300 ${
                            !postProps.showOptions && 'hidden'
                          }`}
                        >
                          <button
                            className="block px-4 py-3 text-sm text-gray-400 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white flex items-center space-x-2 font-bold w-full"
                            onClick={() => {
                              postProps.setUpdateData(post);
                            }}
                          >
                            <FaEdit size={'1.3em'} />
                            <span>Edit Post</span>
                          </button>

                          <button
                            className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white flex items-center space-x-2 font-bold cursor-pointer w-full"
                            onClick={() => postProps.deletePost(post?._id)}
                          >
                            <RiDeleteBin6Line size={'1.3em'} />
                            <span>Move to Trash</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-300"></div>
                  <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2 grid grid-cols-1 grid-row-auto gap-2">
                    <img className="rounded w-full" src={post?.image} alt="" />
                  </div>
                  <div className="text-gray-600 font-bold mb-4 mx-3 px-2 text-2xl">
                    {postProps.isUpdating &&
                    post?.user?._id === postProps.user._id &&
                    post?._id === currentPost ? (
                      <>
                        <h1 className="text-gray-500 font-semibold mb-4 text-5xl">
                          Editing Post
                        </h1>
                        <hr className="mb-4" />
                        <label
                          htmlFor=""
                          className="text-gray-500 font-semibold"
                        >
                          Caption
                        </label>
                        <textarea
                          name="title"
                          value={postProps.title}
                          onChange={(e) => postProps.setTitle(e.target.value)}
                          placeholder="Type something here..."
                          className="w-full rounded-lg p-2 text-sm bg-gray-100 border-2 border-gray-400 mt-2 appearance-none rounded-tg placeholder-gray-400 font-normal h-auto focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300"
                        ></textarea>
                      </>
                    ) : (
                      post?.title
                    )}
                  </div>
                  <div className="text-gray-500 text-lg mb-6 mx-3 px-2">
                    <h1 className="font-semibold">
                      What did you work on today?
                    </h1>
                    {postProps.isUpdating &&
                    post?.user?._id === postProps.user._id &&
                    post?._id === currentPost ? (
                      <textarea
                        name="todayText"
                        value={postProps.todayText}
                        onChange={(e) => postProps.setTodayText(e.target.value)}
                        placeholder="Type something here..."
                        className="w-full rounded-lg p-2 text-sm bg-gray-100 border-2 border-gray-400 mt-2 appearance-none rounded-tg placeholder-gray-400 h-24 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300"
                      ></textarea>
                    ) : (
                      post?.todayText
                    )}
                  </div>
                  <div className="text-gray-500 text-lg mb-6 mx-3 px-2">
                    <h1 className="font-semibold">
                      What are you planning to work on tonight/tomorrow?
                    </h1>
                    {postProps.isUpdating &&
                    post?.user?._id === postProps.user._id &&
                    post?._id === currentPost ? (
                      <textarea
                        name="tomorrowText"
                        value={postProps.tomorrowText}
                        onChange={(e) =>
                          postProps.setTomorrowText(e.target.value)
                        }
                        placeholder="Type something here..."
                        className="w-full rounded-lg p-2 text-sm bg-gray-100 border-2 border-gray-400 mt-2 appearance-none rounded-tg placeholder-gray-400 h-24 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300"
                      ></textarea>
                    ) : (
                      post?.tomorrowText
                    )}
                  </div>
                  <div className="text-gray-500 text-lg mb-6 mx-3 px-2">
                    <h1 className="font-semibold">
                      What blockers do you have?
                    </h1>
                    {postProps.isUpdating &&
                    post?.user?._id === postProps.user._id &&
                    post?._id === currentPost ? (
                      <textarea
                        name="blockersText"
                        value={postProps.blockersText}
                        onChange={(e) =>
                          postProps.setBlockersText(e.target.value)
                        }
                        placeholder="Type something here..."
                        className="w-full rounded-lg p-2 text-sm bg-gray-100 border-2 border-gray-400 mt-2 appearance-none rounded-tg placeholder-gray-400 h-24 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300"
                      ></textarea>
                    ) : (
                      post?.blockersText
                    )}
                  </div>

                  <div className="flex justify-start mb-4 border-t border-gray-300">
                    <div className="flex w-full mt-1 pt-2 pl-5">
                      {/* <span className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 text-center rounded-full text-gray-400 cursor-pointer mr-2">
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
                  </span> */}
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
                    <div
                      className="flex justify-end items-center w-full mt-1 pt-2 pr-5"
                      onClick={() => {
                        setIsLiked((prevState) => !prevState);
                        togLike(user?._id, post?._id);
                      }}
                    >
                      <span className="transition ease-out duration-300 hover:bg-gray-50 bg-gray-100 h-8 px-1 py-1 text-center rounded-full cursor-pointer">
                        {/* <svg
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
                    </svg> */}
                        {/* AiOutlineLike, AiFillLike */}
                        {/* <AiOutlineLike size={'1.5em'} color={'blue'} /> */}

                        {post?.likes?.includes(user?._id) ? (
                          <AiFillLike
                            size={'1.5em'}
                            className="text-blue-400"
                          />
                        ) : (
                          <AiOutlineLike
                            size={'1.5em'}
                            className="text-blue-400"
                          />
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex w-full border-t border-gray-300">
                    <div className="mt-3 mx-5 flex flex-row text-xs">
                      <div className="flex text-gray-800 font-semibold rounded-md mb-2 mr-4 items-center">
                        Comments:
                        <div className="ml-1 text-gray-600 text-ms">
                          {post?.comments?.length}
                        </div>
                      </div>
                      <div className="flex text-gray-700 text-gray-800 font-semibold rounded-md mb-2 mr-4 items-center">
                        Likes:
                        <div className="ml-1 text-gray-600 text-ms">
                          {post?.likes?.length}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative flex flex-col  w-full p-4 overflow-hidden text-gray-600 focus-within:text-gray-400 mb-8">
                    <div>
                      {post?.comments?.map((comment) => (
                        <Comments
                          commentId={comment?._id}
                          fetchPosts={postProps.fetchPosts}
                          postId={post?._id}
                          commentCount={post?.comments?.length}
                          setTotalComments={setTotalComments}
                        />
                      ))}
                    </div>
                    {/* ADD COMMENT SECTION */}
                    <div className="flex w-full mt-8">
                      <img
                        className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
                        alt="User avatar"
                        src={postProps?.user?.image}
                      />
                      <span className="absolute inset-y-50 right-0 flex items-center pr-6">
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
                      <form
                        className="w-full"
                        onSubmit={(e) => {
                          e.preventDefault();
                          postProps.insertNewComment(
                            postProps.user?._id,
                            post?._id,
                            postProps.comment
                          );
                          postProps.setComment('');
                        }}
                      >
                        <input
                          type="text"
                          className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border-2 border-gray-300 appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
                          value={postProps.comment}
                          onChange={(e) => postProps.setComment(e.target.value)}
                          style={{ borderRadius: '25px' }}
                          placeholder="Post a comment..."
                          autoComplete="off"
                        />
                      </form>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};

export default Posts;
