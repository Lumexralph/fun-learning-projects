import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import HeaderContainer from '../home/HeaderContainer';
import AdminPanel from './AdminPanel';
import AdminRequestTable from './AdminRequestTable';
import loadRequests from '../../actions/getAllRequests';
import userRequests from '../../actions/userRequests';
import adminActionOnRequest from '../../actions/adminActionOnRequest';


export class AdminDashBoard extends Component {
  state = {
    navLinks: ['Home', 'Logout'],
  }

  componentDidMount() {
    return this.loadRequests();
  }

  loadRequests = (params) => {
    const { loadAdminRequests, storeUserRequests } = this.props;

    return loadAdminRequests(params)
      .then((response) => {
        const requests = response.data.message ? [] : response.data;
        storeUserRequests(requests);
      });
  }

  rejectRequest = (event, request) => {
    const { adminAction } = this.props;

    if (request.status === 'rejected' || request.status === 'resolved') return null;

    return this.handleRequestTableUpdate(adminAction, 'disapprove', request);
  }

  approveRequest = (event, request) => {
    const { adminAction } = this.props;

    if (request.status === 'approved' || request.status === 'resolved') return null;

    return this.handleRequestTableUpdate(adminAction, 'approve', request);
  }

  resolveRequest = (event, request) => {
    const { adminAction } = this.props;

    if (request.status === 'resolved') return null;

    return this.handleRequestTableUpdate(adminAction, 'resolve', request);
  }

  handleRequestFilter = (event) => {
    const { target: { value } } = event;

    return this.loadRequests(value);
  }

  handleRequestTableUpdate = (adminAction, actionType, request) => {
    const { storeUserRequests, loadAdminRequests } = this.props;

    return adminAction(request.request_id, actionType)
      .then(() => {
        loadAdminRequests()
          .then((response) => {
            const requests = response.data.message ? [] : response.data;
            storeUserRequests(requests);
          });
      });
  }

  render() {
    const { navLinks } = this.state;
    const { requests, history } = this.props;
    return (
      <div className="container">
        <HeaderContainer navText={navLinks} history={history} />
        <main>
          <AdminPanel
            onFilter={this.handleRequestFilter}
          />
          <AdminRequestTable
            onAccept={this.approveRequest}
            onReject={this.rejectRequest}
            onResolve={this.resolveRequest}
            requests={requests}
          />
        </main>
      </div>
    );
  }
}

AdminDashBoard.propTypes = {
  requests: PropTypes.array.isRequired,
  loadAdminRequests: PropTypes.func.isRequired,
  storeUserRequests: PropTypes.func.isRequired,
  adminAction: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export const mapStateToProps = state => ({
  requests: state.userRequests,
});

export const mapDispatchToProps = dispatch => ({
  loadAdminRequests: params => dispatch(loadRequests(params)),
  storeUserRequests: requests => dispatch(userRequests(requests)),
  adminAction: (id, action) => dispatch(adminActionOnRequest(id, action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashBoard);
