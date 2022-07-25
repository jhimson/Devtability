import React, { createContext, useState } from 'react';

export const UserContext = createContext();

const getUser = () => {
    if (localStorage.getItem('token'))
      
    return JSON.parse(
      window.atob(localStorage.getItem('token')?.split('.')[1])
    );
  };

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(getUser()?.user || null);
  return (
    <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
