import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';

const LoginFormContainer = ({
  onUsernameChange,
  onPasswordInput,
  onSubmit,
}) => (
  <main className="signup-container-img">
    <section className="signup-container login">
      <LoginForm
        onUsernameChange={onUsernameChange}
        onPasswordInput={onPasswordInput}
        onSubmit={onSubmit}
      />
    </section>
  </main>
);

LoginFormContainer.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginFormContainer;
