import React from 'react';
import './style.scss';
import {
  APP_NAME,
  APP_MAIL,
  APP_DESCRIPTION,
} from '../../features/constants/app';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h6 className="footer__app-name">{APP_NAME}</h6>
        <p className="footer__app-description">
          {APP_DESCRIPTION}
          <a
            href={`mailto: ${APP_MAIL}`}
            className="footer__app-description__mail"
          >
            {APP_MAIL}
          </a>
        </p>
        <p className="footer__copyright">
          © {new Date().getFullYear()} Notes App
        </p>
      </div>
    </footer>
  );
};

export default Footer;
