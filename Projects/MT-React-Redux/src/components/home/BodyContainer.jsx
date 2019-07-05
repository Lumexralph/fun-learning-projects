import React from 'react';
import PropTypes from 'prop-types';

import BodyText from './BodyText';
import AuthButton from './AuthButton';

const BodyContainer = ({ text }) => (
  <main>
    <section className="heading-img">
      <div className="heading">
        <BodyText />
        <div className="signup-login">
          <AuthButton background="background-tertiary-2" text={text[0]} />
          <AuthButton background="background-tertiary" text={text[1]} />
        </div>
      </div>
    </section>
  </main>
);

BodyContainer.propTypes = {
  text: PropTypes.array.isRequired,
};

export default BodyContainer;
