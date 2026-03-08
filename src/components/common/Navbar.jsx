import React from 'react';
import { Bell, Search, User, Zap, ChevronDown, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';


const Navbar = () => {

  const { user, logout } = useAuth();


  const handleLogout = () => {

    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <header className="navbar">
      <div className="flex items-center gap-6 flex-1">
        <div className="navbar-search-container">
          <Search
            size={16}
            className="navbar-search-icon"
          />
          <input
            type="text"
            className="input-field navbar-search-input"
            placeholder="Search for people, tickets..."
          />
        </div>
      </div>


      <div className="flex items-center gap-4">

        <button className="navbar-icon-btn">
          <Globe size={18} />
        </button>


        <button className="navbar-icon-btn">
          <Bell size={18} />

          <span className="notification-badge"></span>
        </button>


        <div className="navbar-divider"></div>


        <div className="navbar-user-info">

          <div className="navbar-avatar">
            {user?.name?.charAt(0)}
          </div>

          <div className="navbar-user-text">
            <span className="navbar-user-name">{user?.name}</span>
            <span className="navbar-user-role">{user?.role}</span>
          </div>

          <ChevronDown size={14} className="text-light" />
        </div>


        <button
          onClick={handleLogout}
          title="Logout"
          className="navbar-logout-btn"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header >

  );
};

export default Navbar;

