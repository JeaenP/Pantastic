import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <span className="progress-text">{progress}/100</span>
    </div>
  );
};

export default ProgressBar;