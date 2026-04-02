import React from 'react';
import './Loader.css';

const Loader = ({ fullScreen = false, text = 'Загрузка...' }) => {
  return (
    <div className={`loader-container ${fullScreen ? 'loader-fullscreen' : ''}`}>
      <div className="loader-spinner"></div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;