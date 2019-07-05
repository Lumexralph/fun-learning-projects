import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import requestHOC from '../HOC/withUserPage';

export const SingleRequest = ({ request }) => (
  <div className="request-container">
    <h2>{request.request_title}</h2>
    <h4><i className="fa fa-file-text-o" aria-hidden="true" />  {request.request_content}</h4>
    <p><i className="fa fa-building" /> {request.department}</p>
    <p><i className="fa fa-flag-checkered" aria-hidden="true" /> {request.status}</p>
    <div>
      <button className="btn btn-nav" type="button">
        <Link to="/request/edit" style={{ textDecoration: 'none' }}><i className="fa fa-edit" /></Link>
      </button>
    </div>
  </div>
);

SingleRequest.propTypes = {
  request: PropTypes.object.isRequired,
};

const SingleRequestPage = requestHOC(SingleRequest);

export default SingleRequestPage;
