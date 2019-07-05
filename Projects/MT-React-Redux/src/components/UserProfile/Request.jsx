import React from 'react';
import PropTypes from 'prop-types';

import RequestCard from './RequestCard';

const Request = ({ data }) => {
  if (data.length > 0) {
    const requestCards = data.map(request => (
      <div key={request.request_id}>
        <RequestCard
          title={request.request_title}
          department={request.department}
          status={request.status}
          id={request.request_id}
        />
      </div>
    ));

    return requestCards;
  }

  return (
    <div className="request-card">
      <p>No requests created yet, you can make a request!</p>
    </div>
  );
};

Request.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Request;
