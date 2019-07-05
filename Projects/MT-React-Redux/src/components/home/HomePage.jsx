import React from 'react';

import HeaderContainer from './HeaderContainer';
import BodyContainer from './BodyContainer';
import FooterContainer from './FooterContainer';

// the container component for homepage
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navText: ['Signup', 'Login'],
    };
  }

  render() {
    const { navText } = this.state;
    return (
      <div className="container">
        <HeaderContainer navText={navText} />
        <BodyContainer text={navText} />
        <FooterContainer />
      </div>
    );
  }
}

export default HomePage;
