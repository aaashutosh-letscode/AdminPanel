import React from 'react';
import './SelectInput.css';

const SelectInput = ({ label, value, onChange, options }) => {
  return (
    <label className="select-input-label">
      <span>{label}</span>
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInput;
