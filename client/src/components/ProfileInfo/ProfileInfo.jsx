import React, { useContext, useEffect, useState } from 'react';

import { setUserProfile, fetchUsers } from '../../utils/users-api';

const ProfileInfo = ({ user, setUser, userLoggedIn }) => {
  // ! CONTEXTS
  const [usersEmail, setUsersEmail] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [github, setGithub] = useState('');

  const setLocalStates = () => {
    setName(user?.name);
    setEmail(user?.email);
    setAddress(user?.address);
    setLinkedIn(user?.linkedIn);
    setGithub(user?.github);
  };

  const updateUserInfo = () => {
    setUser((prevState) => ({
      ...prevState,
      address,
      email,
      github,
      linkedIn,
      name,
    }));
  };

  const updateUserProfile = async () => {
    const response = await setUserProfile({
      userId: user?._id,
      name,
      email,
      address,
      linkedIn,
      github,
    });
    if (response) {
      //! RESETS THE USER TOKEN IN THE LOCALSTORAGE
      const token = JSON.parse(
        window.atob(response.data.accessToken.split('.')[1])
      );
      localStorage.setItem('token', JSON.stringify(response.data.accessToken));
      setUser(token.user);
      console.log(`Successfully updated profile`, response);
    }
  };

  const getUsers = async () => {
    const response = await fetchUsers(user?._id);
    if (response) {
      console.log(`Successfully fetched users`, response.data);
      const emails = response?.data?.map((user) => user?.email);
      setUsersEmail(emails);
    }
  };

  const checkIfEmailExists = (updatedEmail) => {
    const exist = usersEmail?.includes(updatedEmail);
    if (exist) {
      setEmailExists(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="bg-white shadow rounded-lg p-10 mb-8 flex flex-col">
        <div className="self-end">
          <div className="flex">
            {isUpdating && (
              <>
                <button
                  className={`bg-transparent bg-green-500 hover:bg-green-600 text-white font-bold hover:text-white py-2 px-4 border border-green-400 hover:border-transparent rounded mr-2 ${
                    emailExists &&
                    'bg-gray-600 border-gray-700 hover:bg-gray-500'
                  }`}
                  onClick={() => {
                    updateUserInfo();
                    setIsUpdating(false);
                    updateUserProfile();
                  }}
                  disabled={emailExists}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 hover:bg-red-800 text-white font-bold hover:text-white py-2 px-4 border border-red-400 hover:border-transparent rounded mr-2"
                  onClick={() => {
                    setIsUpdating(false);
                    setEmailExists(false);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
            {!isUpdating && userLoggedIn?._id === user?._id && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer hover:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                onClick={() => {
                  setLocalStates();
                  setIsUpdating(true);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1 text-center items-center">
          <img
            className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2000&amp;q=80"
            alt=""
          />
          {isUpdating ? (
            <div class="w-1/6 transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mt-2">
              <input
                type="text"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-gray-700 font-semibold"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          ) : (
            <p className="font-semibold">{user?.name}</p>
          )}

          <div className="text-sm leading-normal text-gray-400 flex justify-center items-center mb-8">
            {isUpdating ? (
              <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mt-2">
                <input
                  type="text"
                  className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-gray-600 font-semibold"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  className="mr-1"
                  width="16"
                  height="16"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {user?.address}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 my-3">
          <div className="font-semibold text-center mx-4">
            <p className="text-black">Email Address</p>
            {isUpdating ? (
              <>
                <div
                  class={`w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-${
                    emailExists ? 'red' : 'blue'
                  }-500 mt-2`}
                >
                  <input
                    type="text"
                    className={`w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-${
                      emailExists ? 'red' : 'gray'
                    }-600 text-sm`}
                    value={email}
                    onChange={(e) => {
                      checkIfEmailExists(e.target.value);
                      setEmail(e.target.value);
                    }}
                  />
                </div>
              </>
            ) : (
              <span className="text-gray-400">{user?.email}</span>
            )}
          </div>
          <div className="font-semibold text-center mx-4">
            <p className="text-black">Github</p>
            {isUpdating ? (
              <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mt-2">
                <input
                  type="text"
                  className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-gray-600 text-sm"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
            ) : (
              <span className="text-gray-400">{user?.github}</span>
            )}
          </div>
          <div className="font-semibold text-center mx-4">
            <p className="text-black">LinkedIn</p>
            {isUpdating ? (
              <div class="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 mt-2">
                <input
                  type="text"
                  className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none text-gray-600 text-sm"
                  value={linkedIn}
                  onChange={(e) => setLinkedIn(e.target.value)}
                />
              </div>
            ) : (
              <span className="text-gray-400">{user?.linkedIn}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
