/* eslint-disable no-unreachable */
import React from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

export default function Layout({ children, active, user , setUser}) {
  return (
    <>
      <div>
        <header style={{minHeight:'10vh'}}>
          <NavBar active={active} user={user} setUser={setUser}/>
        </header>
        <main style={{minHeight:'65vh'}}>{children}</main>
        <footer style={{height:'20vh'}}>
          <Footer />
        </footer>
      </div>
    </>
  );
}
