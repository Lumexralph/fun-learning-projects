import React from 'react';
import PropTypes from 'prop-types';

import requestHOC from '../HOC/withUserPage';

import Request from './Request';

export const UserRequests = ({ requests }) => (
  <div className="card-container">
    <Request data={requests} />
  </div>
);

UserRequests.propTypes = {
  requests: PropTypes.array.isRequired,
};

export default requestHOC(UserRequests);
