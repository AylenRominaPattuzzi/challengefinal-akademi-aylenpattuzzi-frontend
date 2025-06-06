import React from 'react';
import './Loading.css';

const Loading = () => {
  return (
    <div className="custom-loading-overlay">
      <div className="spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default Loading;
