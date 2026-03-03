import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Navbar />
        {/* 
                    The 'content-inner' class is now applied inside individual pages 
                    to allow for custom page transitions and specific layout control.
                */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
