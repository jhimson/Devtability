import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//! PAGES
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import StandUps from './pages/StandUps/StandUps';
import Profile from './pages/Profile/Profile';
import PeoplePage from './pages/PeoplePage/PeoplePage';


// ! COMPONENTS
import Layout from './components/Layout/Layout';

// ! CONTEXTS
// import UserContextProvider from './contexts/UserContext';
import { UserContext } from './contexts/UserContext';

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
            <Route path="/profile" element={<Profile exact />} />
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
