import React from 'react';
import Main from '../../components/Main/Main';
import Sidenav from '../../components/Sidenav/Sidenav';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* <Sidenav /> */}
      <Main sidenav={<Sidenav />}>
        {/* <NavHeader user={user} /> */}
        <div className="w-11/12 mx-auto mt-4">
          <article className="">
            {/* <ProfileInfo user={user} setUser={setUser} userLoggedIn={user} />
              <Partner partner={partner} setShowModal={setShowModal} />
              <Contacts {...contactsProps} />
              <PostForm {...postFormProps} />
              <Posts {...postProps} /> */}
          </article>
        </div>
      </Main>
    </div>
  );
};

export default Dashboard;
