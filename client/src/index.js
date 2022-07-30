import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// ! CONTEXTS
import UserContextProvider from './contexts/UserContext';
import ContactContextProvider from './contexts/ContactContext';
import AlertContextProvider from './contexts/AlertContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ContactContextProvider>
        <AlertContextProvider>
          <Router>
            <App />
          </Router>
        </AlertContextProvider>
      </ContactContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
