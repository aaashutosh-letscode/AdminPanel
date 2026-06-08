import React from 'react';
import './TextArea.css';

const TextArea = ({ label, value, onChange, placeholder, rows = 4 }) => {
  return (
    <label className="textarea-label">
      <span>{label}</span>
      <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder} />
    </label>
  );
};

export default TextArea;
