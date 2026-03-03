import React from 'react';
import { Bell, Search, User, Zap, ChevronDown, Globe, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Navbar component that appears at the top of the page.
 */
const Navbar = () => {
  // Get our user data and logout function from the AuthContext.
  const { user, logout } = useAuth();

  /**
   * Function to handle clicking 'Logout'.
   */
  const handleLogout = () => {
    // Basic confirmation dialog for the user.
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
    }
  };

  return (
    <header className="navbar">

      {/* Left side: Search bar */}
      <div className="flex items-center gap-6 flex-1">
        <div className="navbar-search-container">
          {/* Search Icon positioned absolutely inside the input container */}
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

      {/* Right side: Notifications, User Profile, and Logout */}
      <div className="flex items-center gap-4">
        {/* Globe/Language Button */}
        <button className="navbar-icon-btn">
          <Globe size={18} />
        </button>

        {/* Notification Bell with Badge */}
        <button className="navbar-icon-btn">
          <Bell size={18} />
          {/* Red dot notification badge */}
          <span className="notification-badge"></span>
        </button>

        {/* Separator line */}
        <div className="navbar-divider"></div>

        {/* User Profile Info */}
        <div className="navbar-user-info">
          {/* User's profile circle (e.g., "J" for John) */}
          <div className="navbar-avatar">
            {user?.name?.charAt(0)}
          </div>

          <div className="navbar-user-text">
            <span className="navbar-user-name">{user?.name}</span>
            <span className="navbar-user-role">{user?.role}</span>
          </div>

          <ChevronDown size={14} className="text-light" />
        </div>

        {/* Logout Button */}
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

