import React from 'react';
import { Link } from 'react-router-dom';
import footerLogo from '../img/logo-2.png';

const FooterContainer = () => (
  <footer className="footer background-quarternary">
    <div>
      <Link to="/">
        <img className="footer-logo" src={footerLogo} alt="app logo" />
      </Link>
    </div>
    <div>
      <div className="footer-details text-secondary">
        <div className="footer-info">
          <div>FixZit 5555 Address St. #555 City, State 55555</div>
          <div>01-2245-789</div>
          <div className="footer-icon">
            <Link to="/">
              <i className="fa fa-facebook-f text-secondary" />
            </Link>
            <Link to="/">
              <i className="fa fa-linkedin text-secondary" />
            </Link>
            <Link to="/">
              <i className="fa fa-twitter text-secondary" />
            </Link>
            <Link to="/">
              <i className="fa fa-instagram text-secondary" />
            </Link>
          </div>
        </div>
        <div className="footer-links">

          <div className="footer-links-copyright">Copyright &copy; 2018 ALL RIGHTS RESERVED</div>
          <div className="footer-nav-links-container">
            <ul className="footer-nav-links">
              <li>
                <Link to="/">ABOUT US</Link>
              </li>
              <li>
                <Link to="/">PRIVACY</Link>
              </li>
              <li>
                <Link to="/">TERMS OF USE</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default FooterContainer;
