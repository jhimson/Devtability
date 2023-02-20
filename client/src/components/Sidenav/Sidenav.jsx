import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaUsers } from 'react-icons/fa';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

import { Logout } from '../../utils/users-api';

const Sidenav = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    Logout();
    setUser(null);
    navigate('/login');
  };
  return (
    <>
      <div className="mx-auto py-10">
        <div className="mt-8 text-center">
          <img
            src={user?.image}
            alt=""
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {user?.name}
          </h5>
          <span className="hidden text-gray-400 lg:block">{user?.title}</span>
        </div>
        <ul>
          <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
            <Link to="/user-profile" className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="font-semibold">Profile</span>
            </Link>
          </li>
          <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
            <Link to="/stand-ups" className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-semibold">Stand Ups</span>
            </Link>
          </li>
          <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
            <Link to="/people" className="flex space-x-2">
              <FaUsers />
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg> */}
              <span className="font-semibold">People</span>
            </Link>
          </li>
          <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
            <Link to="/messenger" className="flex space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="font-semibold">Messenger</span>
            </Link>
          </li>
          {/* <li className="flex space-x-2 mt-10 cursor-pointer hover:text-[#EC5252] duration-150">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="font-semibold">Pair Programming</span>
          </li> */}
          <button
            className="w-full mt-10 bg-[#EC5252] rounded-full py-1.5 text-white"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </ul>
      </div>
    </>
  );
};

export default Sidenav;
