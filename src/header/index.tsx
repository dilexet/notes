import React from 'react';
import './style.scss';
import { APP_NAME } from '../footer';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__content">
        <h1 className="header__content__title">{APP_NAME}</h1>
      </div>
    </header>
  );
};

export default Header;
