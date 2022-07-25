import React, { useContext } from 'react';
// ! COMPONENTS
import Sidenav from '../../components/Sidenav/Sidenav';
// ! CONTEXTS IMPORTS
import { UserContext } from '../../contexts/UserContext';

const StandUps = () => {
  // ! CONTEXTS
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <div className="h-screen bg-red-400">
        <Sidenav />
        <div>Welcome, {user.name}!</div>
      </div>
    </>
  );
};

export default StandUps;
