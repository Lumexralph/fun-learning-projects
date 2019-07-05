import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import HeaderContainer from '../home/HeaderContainer';
import SignupFormContainer from './SignupFormContainer';
import FooterContainer from '../home/FooterContainer';
import registerUser from '../../actions/registerUser';
import currentUser from '../../actions/currentUser';
import ShowLoadingStatus from '../LoadingStatus';
import updateStorageData from '../../helpers/updateStorageData';


export class SignupPage extends Component {
  state = {
    navText: ['Home', 'Login'],
    username: '',
    email: '',
    password1: '',
    password2: '',
    message: null,
    isLoading: false,
  }

  handleUsernameChange = (event) => {
    const { target } = event;
    this.setState({ username: target.value });
  }

  handleEmailChange = (event) => {
    const { target } = event;
    this.setState({ email: target.value });
  }

  handlePasswordChange = (event) => {
    const { target } = event;
    const { name, value } = target;

    this.setState((previousState) => {
      let { password1, password2 } = previousState;

      if (name === 'psw1') {
        password1 = value;
        return { password1 };
      }

      password2 = value;
      return { password2 };
    });
  }

  handleSubmit = (event) => {
    const {
      password1, password2, username, email,
    } = this.state;

    this.setState({ isLoading: true });

    const { signupNewUser, setCurrentUser } = this.props;
    event.preventDefault();
    const result = (password1 === password2);

    if (result) {
      const user = {
        password1, password2, username, email,
      };

      signupNewUser(user)
        .then((response) => {
          setCurrentUser(response.data);
          updateStorageData('token', response.data.token);
          updateStorageData('admin', response.data.adminRole);
          this.setState({
            message: 'Signup successful',
            isLoading: false,
          });
        })
        .catch((error) => {
          const errorMessage = (!error.response) ? 'Please ensure you have internet connection' : error.response.data.message;

          this.setState({
            isLoading: false,
            message: errorMessage,
          });

          return errorMessage;
        });
    } else {
      this.setState({
        isLoading: false,
        message: 'Password do not match',
      });
    }
  }

  render() {
    const { navText, isLoading, message } = this.state;

    return (
      <div className="container">
        {message === 'Signup successful' ? <Redirect to="/profile" /> : null}
        <HeaderContainer navText={navText} />
        <ShowLoadingStatus
          status={isLoading}
          text={message}
        />
        <SignupFormContainer
          onSubmit={this.handleSubmit}
          onUsernameChange={this.handleUsernameChange}
          onEmailChange={this.handleEmailChange}
          onPasswordChange={this.handlePasswordChange}
          buttonStatus={isLoading}
        />
        <FooterContainer />
      </div>
    );
  }
}


SignupPage.propTypes = {
  signupNewUser: PropTypes.func.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  signupNewUser: user => dispatch(registerUser(user)),
  setCurrentUser: user => dispatch(currentUser(user)),
});

export default connect(null,
  mapDispatchToProps)(SignupPage);
