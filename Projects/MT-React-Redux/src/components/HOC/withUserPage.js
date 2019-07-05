import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HeaderContainer from '../home/HeaderContainer';
import loadUserRequests from '../../actions/loadUserRequests';
import userRequests from '../../actions/userRequests';
import createUserRequest from '../../actions/createUserRequest';
import getSingleRequest from '../../actions/getSingleRequest';
import currentRequest from '../../actions/currentRequest';
import editUserRequest from '../../actions/editUserRequest';

const userPage = (WrappedComponent) => {
  class RequestComponent extends Component {
    state = {
      navLinks: ['Home', 'My Requests', 'Make A Request', 'Logout'],
    }

    componentDidMount() {
      const {
        getUserRequests, storeUserRequests, match, getRequestById, viewedRequest,
        presentRequest,
      } = this.props;
      const { id } = match.params;

      this.setState(previousState => ({
        ...previousState,
        id: presentRequest.request_id,
        request: {
          ...previousState.request,
          title: presentRequest.request_title,
          content: presentRequest.request_content,
          department: presentRequest.department,
        },
      }));

      if (id) {
        getRequestById(id)
          .then((response) => {
            viewedRequest(response.data);
          })
          .catch((error) => {
            const { response } = error;
            this.setState(previousState => ({
              ...previousState,
              message: response.data.message,
            }));
          });
      }

      getUserRequests()
        .then((response) => {
          const requests = response.data.message ? [] : response.data;
          storeUserRequests(requests);
        })
        .catch(error => error);
    }

    handleUserInput = (event) => {
      const { target } = event;
      const { name, value } = target;
      this.setState(previousState => ({
        ...previousState,
        message: null,
        request: {
          ...previousState.request,
          [name]: value,
        },
      }));
    }

    handleFormSubmit = (event) => {
      event.preventDefault();

      const { createRequest, history } = this.props;
      const { request } = this.state;

      createRequest(request)
        .then(() => {
          history.push('/profile');
        })
        .catch((error) => {
          const { response } = error;
          this.setState(previousState => ({
            ...previousState,
            message: response.data.message,
          }));
        });
    }

    handleFormUpdate = (event) => {
      event.preventDefault();

      const { request, id } = this.state;
      const { updateRequest, history } = this.props;

      updateRequest(id, request)
        .then(() => {
          history.push('/profile');
        })
        .catch((error) => {
          const { response } = error;
          this.setState(previousState => ({
            ...previousState,
            message: response.data.message,
          }));
        });
    }

    render() {
      let requestData;
      let handleSubmit;
      const { navLinks, message = null } = this.state;
      const { requests, presentRequest, history, history: { location: { pathname } } } = this.props;

      // set form submit based on create or update request
      if (pathname === '/request/create') {
        handleSubmit = this.handleFormSubmit;
        requestData = null;
      } else {
        handleSubmit = this.handleFormUpdate;
        requestData = presentRequest;
      }

      return (
        <div className="container">
          <HeaderContainer navText={navLinks} history={history} />
          <WrappedComponent
            requests={requests}
            onChange={this.handleUserInput}
            onSubmit={handleSubmit}
            onLoad={this.handleFormDefaultData}
            message={message}
            request={requestData}
            pathname={pathname}
          />
        </div>
      );
    }
  }

  RequestComponent.propTypes = {
    getUserRequests: PropTypes.func.isRequired,
    storeUserRequests: PropTypes.func.isRequired,
    createRequest: PropTypes.func.isRequired,
    viewedRequest: PropTypes.func.isRequired,
    getRequestById: PropTypes.func.isRequired,
    updateRequest: PropTypes.func.isRequired,
    requests: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    presentRequest: PropTypes.object.isRequired,
  };

  const mapStateToProps = state => ({
    requests: state.userRequests,
    presentRequest: state.currentRequest,
  });

  const mapDispatchToProps = dispatch => ({
    getUserRequests: () => dispatch(loadUserRequests()),
    storeUserRequests: requests => dispatch(userRequests(requests)),
    createRequest: request => dispatch(createUserRequest(request)),
    getRequestById: id => dispatch(getSingleRequest(id)),
    viewedRequest: request => dispatch(currentRequest(request)),
    updateRequest: (id, request) => dispatch(editUserRequest(id, request)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(RequestComponent);
};

export default userPage;
