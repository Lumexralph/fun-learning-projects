import React from 'react';
import PropTypes from 'prop-types';

import AdminRequestTableContent from './AdminRequestTableContent';

const AdminRequestTable = ({
  requests, onAccept, onReject, onResolve,
}) => (
  <section>
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Request Id</th>
            <th>Status</th>
            <th>Request Title</th>
            <th>Action</th>
            <th>Resolved</th>
          </tr>
        </thead>
        <tbody>
          {<AdminRequestTableContent
            requests={requests}
            onAccept={onAccept}
            onReject={onReject}
            onResolve={onResolve}
          />}
        </tbody>
      </table>
    </div>
  </section>);

AdminRequestTable.propTypes = {
  requests: PropTypes.array.isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onResolve: PropTypes.func.isRequired,
};

export default AdminRequestTable;
