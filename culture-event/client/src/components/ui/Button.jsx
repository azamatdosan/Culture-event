import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', // primary, secondary, danger, outline
  size = 'medium',     // small, medium, large
  isLoading = false, 
  disabled = false, 
  onClick, 
  className = '' 
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className} ${isLoading ? 'btn-loading' : ''}`}
      onClick={onClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? <span className="btn-spinner"></span> : children}
    </button>
  );
};

export default Button;