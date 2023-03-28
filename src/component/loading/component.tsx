import React from 'react';
import './style.scss';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <div className="loading-message">Loading...</div>
    </div>
  );
};

export default Loading;
