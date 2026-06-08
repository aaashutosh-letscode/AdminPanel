import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  icon: Icon,
  iconPosition = 'left',
  ...props 
}) => {
  return (
    <button 
      className={`btn btn-${variant} btn-${size}`} 
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="btn-icon" />}
      {children && <span>{children}</span>}
      {Icon && iconPosition === 'right' && <Icon className="btn-icon" />}
    </button>
  );
};

export default Button;
