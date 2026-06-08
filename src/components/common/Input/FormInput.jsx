import React from 'react';
import './FormInput.css';

const FormInput = ({ label, value, onChange, placeholder, type = 'text', ...props }) => {
  return (
    <label className="form-input-label">
      <span>{label}</span>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} {...props} />
    </label>
  );
};

export default FormInput;
