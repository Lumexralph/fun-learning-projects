import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import HeaderLogo from './HeaderLogo';
import NavLink from './NavLink';

const HeaderContainer = ({ navText, history }) => {
  const NavLinks = navText.map((text, index) => {
    const key = index + text;
    return (
      <NavLink key={key} text={text} history={history} />
    );
  });

  const nav = (
    <nav>
      <ul className="nav">
        {NavLinks}
      </ul>
    </nav>
  );

  return (
    <Header>
      <HeaderLogo />
      {nav}
    </Header>
  );
};

HeaderContainer.propTypes = {
  navText: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default HeaderContainer;
