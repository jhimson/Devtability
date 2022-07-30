import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//! PAGES
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import StandUps from './pages/StandUps/StandUps';
import UserProfile from './pages/UserProfile/UserProfile';
import PeoplePage from './pages/PeoplePage/PeoplePage';
import Profile from './pages/Profile/Profile';

// ! COMPONENTS
import Layout from './components/Layout/Layout';

// ! CONTEXTS
// import UserContextProvider from './contexts/UserContext';
import { UserContext } from './contexts/UserContext';
import PersonProfile from './pages/PersonProfile/PersonProfile';
import ChatPage from './pages/ChatPage/ChatPage';

const App = () => {
  const { user, setUser } = useContext(UserContext);

  // const [user, setUser] = useState(getUser() || null);

  return (
    <main className="App">
      {user ? (
        <Layout active={true} setUser={setUser} user={user}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard exact />} />
            <Route path="/stand-ups" element={<StandUps exact />} />
            <Route path="/user-profile" element={<UserProfile exact />} />
            <Route path="/profile/:contactId" element={<Profile exact />} />
            <Route
              path="/person-profile/:personId"
              element={<PersonProfile exact />}
            />
            <Route path="/chats" element={<ChatPage exact />} />
            <Route path="/people" element={<PeoplePage exact />} />
            <Route path="/*" element={<Navigate to="/dashboard" />} exact />
          </Routes>
        </Layout>
      ) : (
        <Layout active={true} setUser={setUser} user={user}>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/signup" element={<SignupPage />} exact />
            <Route path="/login" element={<LoginPage />} exact />
            <Route path="/*" element={<Navigate to="/login" />} exact />
          </Routes>
        </Layout>
      )}
    </main>
  );
};

export default App;
