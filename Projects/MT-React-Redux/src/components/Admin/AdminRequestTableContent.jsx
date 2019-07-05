import React from 'react';
import PropTypes from 'prop-types';

const AdminRequestTableContent = ({
  requests, onAccept, onReject, onResolve,
}) => {
  if (requests.length) {
    const RowsOfRequests = requests.map(request => (
      <tr key={Number(request.request_id)}>
        <td className="request-id">{request.request_id}</td>
        <td>{request.status} <i className={`${request.status} fa fa-circle `} /></td>
        <td>
          <p className="request-title">{request.request_title}</p>
        </td>
        <td>
          <button
            onClick={e => onAccept(e, request)}
            type="button"
            className="admin-table-btn accept-btn btn-margin"
            disabled={request.status === 'approved' || request.status === 'resolved'}
          >accept
          </button>
          <button
            onClick={e => onReject(e, request)}
            type="button"
            className="admin-table-btn reject-btn"
            disabled={request.status === 'rejected' || request.status === 'resolved'}
          >reject
          </button>
        </td>
        <td>
          <button
            onClick={e => onResolve(e, request)}
            type="button"
            className="resolve-btn"
            disabled={request.status === 'resolved'}
          >resolve
          </button>
        </td>
      </tr>
    ));

    return RowsOfRequests;
  }
  return (<tr><td>No Requests Yet...</td></tr>);
};

AdminRequestTableContent.propTypes = {
  requests: PropTypes.array.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onResolve: PropTypes.func.isRequired,
};

export default AdminRequestTableContent;
