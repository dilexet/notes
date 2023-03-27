import React from 'react';
import './style.scss';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-header">
          <h3>Oops! Page not found</h3>
          <h1>
            <span className="not-found-number">4</span>
            <span className="not-found-number">0</span>
            <span className="not-found-number">4</span>
          </h1>
        </div>
        <h2 className="not-found-message">
          we are sorry, but the page you requested was not found
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
