import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// ! CONTEXTS
import UserContextProvider from './contexts/UserContext';
import ContactContextProvider from './contexts/ContactContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <ContactContextProvider>
        <Router>
          <App />
        </Router>
      </ContactContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
