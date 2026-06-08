import React from 'react';
import './Header.css';

const Header = ({ onToggleSidebar, onCollapseSidebar }) => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <button className="header-hamburger" type="button" onClick={onToggleSidebar}>
          <span />
          <span />
          <span />
        </button>
        <div className="header-search">
          <span className="search-icon">🔍</span>
          <input type="search" placeholder="Search orders, menu, invoices" />
        </div>
      </div>
      <div className="header-right">
        <button className="icon-button" type="button">
          <span className="bell-icon">🔔</span>
          <span className="notification-badge">3</span>
        </button>
        <button className="profile-button" type="button">
          <div className="profile-avatar">S</div>
          <div className="profile-meta">
            <span>Skylar James</span>
            <small>Super Admin</small>
          </div>
          <span className="profile-arrow">▾</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
