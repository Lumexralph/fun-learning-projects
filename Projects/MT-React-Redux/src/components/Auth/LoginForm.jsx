import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({
  onUsernameChange,
  onPasswordInput,
  onSubmit,
}) => (
  <div>
    <form
      onSubmit={event => onSubmit(event)}
    >
      <div className="container">
        <div className="popup">
          <span className="popuptext" id="myPopup">Ensure the information are correct..</span>
        </div>
        <label htmlFor="uname">
          <input
            onChange={event => onUsernameChange(event)}
            type="text"
            placeholder="enter your username"
            name="uname"
            required
          />
        </label>

        <label htmlFor="psw">
          <input
            onChange={event => onPasswordInput(event)}
            type="password"
            placeholder="enter your password"
            name="psw"
            required
          />
        </label>
        <p>Welcome back, ready to serve you when you&apos;re in</p>

        <button id="loginButton" className="btn signup-btn background-tertiary" type="submit">Login to FixZit</button>

      </div>

    </form>
  </div>
);

LoginForm.propTypes = {
  onUsernameChange: PropTypes.func.isRequired,
  onPasswordInput: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};


export default LoginForm;
