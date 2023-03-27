import React from 'react';
import './style.scss';

export const APP_NAME = 'NoteHub';

export const APP_MAIL = 'pavarha.maksim@gmail.com';

export const APP_DESCRIPTION =
  '"NoteHub" is a simple application for taking and managing notes. Users can create, edit and delete notes with a title, content and tags. The app allows users to search notes by tags. It provides a user-friendly interface and supports responsive design, allowing users to use the app on different devices. With its simple and intuitive design, "NoteHub" is a great tool for personal or professional use.' +
  'If you have any questions write to: ';

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
