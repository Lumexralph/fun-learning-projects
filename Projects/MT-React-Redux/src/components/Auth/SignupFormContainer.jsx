import React from 'react';
import PropTypes from 'prop-types';

import SignupForm from './SignupForm';

const SignupFormContainer = ({
  onSubmit,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
}) => (
  <main className="signup-container-img">
    <section className="signup-container">
      <SignupForm
        onSubmit={onSubmit}
        onUsernameChange={onUsernameChange}
        onEmailChange={onEmailChange}
        onPasswordChange={onPasswordChange}
      />
    </section>
  </main>
);

SignupFormContainer.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SignupFormContainer;
