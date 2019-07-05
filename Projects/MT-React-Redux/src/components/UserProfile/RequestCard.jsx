import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const RequestCard = ({ title, department, status, id }) => (
  <div className="flip-card">
    <div className="flip-card-inner">
      <div className="flip-card-front">
        <h1>{title}</h1>
      </div>
      <div className="flip-card-back">
        <h1>{title}</h1>
        <p><i className="fa fa-building" /> {department}</p>
        <p><i className="fa fa-flag-checkered" aria-hidden="true" />  {status}</p>
        <p><Link to={`/requests/${id}`}>Click to view</Link></p>
      </div>
    </div>
  </div>
);

RequestCard.propTypes = {
  title: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RequestCard;
