import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Menu', path: '/menu' },
  { name: 'Orders', path: '/orders' },
  { name: 'Offers', path: '/offers' },
  { name: 'Home CMS', path: '/home-cms' },
  { name: 'Settings', path: '/settings' }
];

const Sidebar = ({ collapsed, open, onToggle, onClose }) => {
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${open ? 'open' : ''}`}>
      <div className="sidebar-brand">
        <div className="sidebar-logo">R</div>
        <div className="sidebar-title">
          <span>Restaurant</span>
          <strong>Master</strong>
        </div>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            onClick={onClose}
          >
            <span className="sidebar-icon">{item.name.charAt(0)}</span>
            <span className="sidebar-label">{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-footer">
        <button className="sidebar-logout" type="button">
          <span>Logout</span>
        </button>
      </div>
      <button className="sidebar-collapse" type="button" onClick={onToggle}>
        <span>{collapsed ? 'Expand' : 'Collapse'}</span>
      </button>
    </aside>
  );
};

export default Sidebar;
