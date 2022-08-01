import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const Main = ({ sidenav, children }) => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div className="flex">
        <div className="md:flex w-2/5 md:w-1/4 h-screen bg-white border-r hidden">
          {sidenav}
        </div>
        {/* SIDE NAV END */}

        <main className="w-full bg-gray-300 border-l">
          {children}
        </main>
      </div>
    </>
  );
};

export default Main;
