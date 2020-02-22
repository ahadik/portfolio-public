import React from 'react';

import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div>
          <p className="monospace secondary caption">
            <i className="fal fa-copyright" /> {new Date().getFullYear()} – Alex Hadik – <a className="secondary desktop" href="https://github.com/ahadik/portfolio" target="_blank" rel="noopener noreferrer">View this site's sourcecode on GitHub</a>
          </p>
        </div>
        <div>
          <p className="secondary inline__children--6">
            <a className="secondary" href="https://github.com/ahadik" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github" />
            </a>
            <a className="secondary" href="https://www.linkedin.com/in/alexhadik/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin" />
            </a>
            <a className="secondary" href="https://vimeo.com/user850540" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-vimeo" />
            </a>
            <a className="secondary" href="https://www.instagram.com/alexhadik/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
