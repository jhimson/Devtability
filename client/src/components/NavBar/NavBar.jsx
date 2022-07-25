/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Align6.png';
import sample from '../../assets/images/sample.jpg';
import { Logout } from '../../utils/users-api';
import { useNavigate, useLocation } from 'react-router-dom';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

export default function NavBar() {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);

  //! States
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState('');

  const handleLogOut = () => {
    Logout();
    setUser(null);
    navigate('/login');
    setIsShow(false);
  };

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <>
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
        <div
          className="container flex flex-wrap justify-between items-center mx-auto"
          style={{ height: '8vh' }}
        >
          <div className="flex gap-x-10">
            <Link to="/profle" className="flex items-center">
              <img
                src={Logo}
                className="mr-3 h-6 sm:h-9"
                alt=""
                style={{ height: '8vh' }}
              />
            </Link>
            {user && (
              <div
                className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                id="mobile-menu-2"
              >
                <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                  <li>
                    <Link
                      to="/profile"
                      className={`text-white bg-none ${
                        location.pathname === '/profile' &&
                        'bg-blue-800 px-4 py-2 rounded'
                      }`}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/stand-ups"
                      className={`text-white bg-none ${
                        location.pathname === '/stand-ups' &&
                        'bg-blue-800 px-4 py-2 rounded'
                      }`}
                    >
                      Stand Ups
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/featured-jobs"
                      className={`text-white bg-none ${
                        location.pathname === '/featured-jobs' &&
                        'bg-blue-800 px-4 py-2 rounded'
                      }`}
                    >
                      Messaging
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/search-jobs"
                      className={`text-white bg-none ${
                        location.pathname === '/search-jobs' &&
                        'bg-blue-800 px-4 py-2 rounded'
                      }`}
                    >
                      Pair Programming
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="left nav-items">
            {!user && (
              <div
                className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
                id="mobile-menu-2"
              >
                <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                  <li>
                    <Link
                      to="/signup"
                      className={`text-white bg-none ${
                        location.pathname === '/signup' &&
                        'bg-blue-800 px-4 py-2 rounded'
                      }`}
                    >
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className={`text-white bg-none ${
                        location.pathname === '/login' &&
                        'bg-blue-800 px-4 py-2 rounded'
                      }`}
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            <div className={`${!user && 'hidden'}flex items-center md:order-2`}>
              <div className="flex items-center gap-x-4">
                <div>
                  <button
                    type="button"
                    className={`${
                      !user && 'hidden'
                    } flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600`}
                    id="user-menu-button"
                    aria-expanded="false"
                    datadropdown-toggle="dropdown"
                    onClick={() => setIsShow(!isShow)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={sample}
                      alt="user photo"
                    />
                  </button>
                </div>
                {user && (
                  <div className="">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                      <li
                        className={`text-white bg-none ${
                          location.pathname === '/login' &&
                          'bg-blue-800 px-4 py-2 rounded'
                        }`}
                      >
                        {user && `Welcome, ${user.name}`}
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* <!-- Dropdown menu --> */}
              <div
                className={`${
                  !isShow && 'hidden'
                } z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 absolute`}
                id="dropdown"
              >
                <div className="py-3 px-4">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user && user.name}
                  </span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                    {user && user.email}
                  </span>
                </div>
                <ul className="py-1" aria-labelledby="dropdown">
                  <li>
                    <button
                      className="w-full block py-2 px-4 text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-red-500 dark:hover:text-white"
                      onClick={handleLogOut}
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
