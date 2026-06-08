import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder = 'Search', value, onChange }) => {
  return (
    <div className="search-bar">
      <span>🔎</span>
      <input value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default SearchBar;
