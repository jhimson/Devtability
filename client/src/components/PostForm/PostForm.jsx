import React, { useState } from 'react';

const PostForm = ({ ...postFormProps }) => {
  return (
    <>
      {!postFormProps.isUpdating && (
        <form
          onSubmit={postFormProps.handleSubmit}
          className="bg-white shadow rounded-lg mb-6 p-4 mt-4"
        >
          <div className="flex flex-col space-y-2 mb-8">
            <label htmlFor="" className="text-gray-500 font-semibold">
              Title
            </label>
            <textarea
              name="title"
              value={postFormProps.title}
              onChange={(e) => postFormProps.setTitle(e.target.value)}
              placeholder="Type something here..."
              className="w-full rounded-lg p-2 text-sm bg-gray-100 appearance-none rounded-tg placeholder-gray-400 border-2 border-gray-400 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300"
            ></textarea>
          </div>
          <div className="grid grid-cols-3 gap-x-8">
            <div className="flex flex-col space-y-2">
              <label
                htmlFor="todayText"
                className="text-gray-500 font-semibold"
              >
                What did you work on today?
              </label>
              <textarea
                name="todayText"
                value={postFormProps.todayText}
                onChange={(e) => postFormProps.setTodayText(e.target.value)}
                placeholder="Type something here..."
                className="w-full rounded-lg p-2 text-sm bg-gray-100 appearance-none rounded-tg placeholder-gray-400 border-2 border-gray-400 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300"
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
                value={postFormProps.tomorrowText}
                onChange={(e) => postFormProps.setTomorrowText(e.target.value)}
                placeholder="Type something here..."
                className="w-full rounded-lg p-2 text-sm bg-gray-100 appearance-none rounded-tg placeholder-gray-400 border-2 border-gray-400 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300"
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
                value={postFormProps.blockersText}
                onChange={(e) => postFormProps.setBlockersText(e.target.value)}
                placeholder="Type something here..."
                className="w-full rounded-lg p-2 text-sm bg-gray-100 appearance-none rounded-tg placeholder-gray-400 border-2 border-gray-400 focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-300"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col space-y-2 bg-gray-100 p-4 mt-6 rounded w-full">
            <label htmlFor="" className="text-gray-500 font-semibold">
              Upload image
            </label>
            <input
              type="file"
              onChange={(e) => postFormProps.setFile(e.target.files[0])}
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
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
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
    </>
  );
};

export default PostForm;
