import React from 'react';

const ProfileInfo = ({ name, email }) => {
  return (
    <>
      <div className="bg-white shadow rounded-lg p-10 mb-8">
        <div className="flex flex-col gap-1 text-center items-center">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80"
            alt=""
          />
          <p className="font-semibold">{name}</p>
          <div className="text-sm leading-normal text-gray-400 flex justify-center items-center mb-8">
            <svg
              viewBox="0 0 24 24"
              className="mr-1"
              width="16"
              height="16"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            Endicott, New York
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 my-3">
          <div className="font-semibold text-center mx-4">
            <p className="text-black">Email Address</p>
            <span className="text-gray-400">{email}</span>
          </div>
          <div className="font-semibold text-center mx-4">
            <p className="text-black">Github</p>
            <span className="text-gray-400">github.com/Jhimson</span>
          </div>
          <div className="font-semibold text-center mx-4">
            <p className="text-black">LinkedIn</p>
            <span className="text-gray-400">LinkedIn.com/Jhimson</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
