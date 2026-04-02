import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  type = 'text', 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  error, 
  required = false 
}) => {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id} className="input-label">
          {label} {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`input-field ${error ? 'input-error' : ''}`}
        required={required}
      />
      {/* Отображение текста ошибки под полем */}
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;