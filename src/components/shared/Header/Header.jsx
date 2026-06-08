import React, { useState } from 'react';
import { Search, Bell, LogOut, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = ({ onToggleSidebar, onCollapseSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="header-hamburger" type="button" onClick={onToggleSidebar} title="Toggle sidebar">
          <span />
          <span />
          <span />
        </button>
        <div className="header-search">
          <Search className="search-icon" size={18} />
          <input 
            type="search" 
            placeholder="Search orders, menu, invoices..." 
            aria-label="Search"
          />
        </div>
      </div>

      <div className="header-right">
        <button className="icon-button notification-button" type="button" title="Notifications">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <div className="profile-menu-container">
          <button 
            className="profile-button" 
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Profile menu"
          >
            <div className="profile-avatar">SJ</div>
            <div className="profile-meta">
              <span className="profile-name">Skylar James</span>
              <span className="profile-role">Super Admin</span>
            </div>
            <ChevronDown size={18} className={`profile-chevron ${showProfileMenu ? 'open' : ''}`} />
          </button>

          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-item">
                <span>Profile Settings</span>
              </div>
              <div className="dropdown-item">
                <span>Account</span>
              </div>
              <div className="dropdown-divider" />
              <button className="dropdown-item logout-item" type="button">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
