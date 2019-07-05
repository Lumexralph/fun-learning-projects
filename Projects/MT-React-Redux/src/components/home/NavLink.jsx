import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import logOut from '../Auth/LogoutButton';

const NavLink = ({ text, history }) => {
  const link = text.replace(/\s/g, '').toLowerCase();
  const routeLink = {
    home: '/',
    signup: '/signup',
    login: '/login',
    myrequests: '/profile',
    makearequest: '/request/create',
  };
  return (link === 'logout' ? (
    <li>
      <button
        type="button"
        style={{
          background: 'inherit',
        }}
        className="btn nav-link nav-btn"
        onClick={() => logOut(history)}
      >{text}
      </button>
    </li>
  )
    : (
      <li>
        <Link className="btn nav-btn nav-link" to={`${routeLink[link]}`}>{text}</Link>
      </li>
    )
  );
};

NavLink.propTypes = {
  text: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default NavLink;
