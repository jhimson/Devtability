import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

// const getUser = () => {
//   if (localStorage.getItem('token'))
//     return JSON.parse(
//       window.atob(localStorage.getItem('token')?.split('.')[1])
//     );
// };

const AlertContextProvider = ({ children }) => {
  const [alertMessage, setAlertMessage] = useState(null);
  return (
    <AlertContext.Provider value={{ alertMessage, setAlertMessage }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
