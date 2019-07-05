import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({ background, text }) => (
  <Link to={`/${text.toLowerCase()}`}>
    <button type="button" className={`btn signup-login-btn ${background}`}>
      {text}
    </button>
  </Link>
);

Button.propTypes = {
  background: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
