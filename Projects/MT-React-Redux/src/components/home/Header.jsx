import React from 'react';
import Proptypes from 'prop-types';

const Header = ({ children }) => (
  <header>
    {children}
  </header>
);

Header.propTypes = {
  children: Proptypes.any.isRequired,
};

export default Header;
