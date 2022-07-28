import React from 'react';

const NavHeader = ({ user }) => {
  return (
    <>
      <nav className="flex items-center justify-between px-4 bg-white py-6 border-b">
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-1/8">
          <input
            type="text"
            placeholder="search"
            className="bg-gray-100 outline-none w-full"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 cursor-pointer text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div className="flex items-center space-x-4">
          <img
            className="w-8 rounded-full"
            src="https://imagez.tmz.com/image/f7/1by1/2021/12/14/f7703994b69d48ca802df55729a2325c_xl.jpg"
            alt="Elon Musk"
          />
          <p className="hidden md:block">{user?.name}</p>
        </div>
      </nav>
    </>
  );
};

export default NavHeader;
