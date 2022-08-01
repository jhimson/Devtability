import React, { useState, useContext } from 'react';

// ! API
import { fetchSearch } from '../../utils/users-api';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const Search = ({ setSearchList, setIsSearching }) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  const [searchText, setSearchText] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchText('');
    const response = await fetchSearch(user?._id, searchText);
    if (response) {
      setSearchList(response.data);
    }
    setIsSearching(true);
  };
  return (
    <nav className="flex items-center justify-between px-32 bg-gray-300 py-6 border-b">
      <div className="flex items-center bg-gray-100 px-4 py-2 rounded-md space-x-3 w-1/8">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="bg-gray-100 outline-none w-full"
          />
        </form>
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
    </nav>
  );
};

export default Search;
