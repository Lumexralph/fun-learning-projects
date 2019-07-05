import React from 'react';
import PropTypes from 'prop-types';

const AdminPanel = ({ onFilter }) => (
  <section className="admin-container">
    <nav className="admin-panel-1 background-tertiary text-primary admin-panel-1-text">
      <p>Admin Panel</p>
      <p>Welcome, Admin <span id="displayAdminUser" /></p>
      <p>
        <label htmlFor="filter-by">Filter Requests</label>
        <select
          onChange={e => onFilter(e)}
          id="filter-by"
          name="filter-by"
        >
          <option value="none">none</option>
          <option value="approved">approved</option>
          <option value="pending">pending</option>
          <option value="rejected">rejected</option>
          <option value="resolved">resolved</option>
        </select>
      </p>
    </nav>
  </section>
);

AdminPanel.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default AdminPanel;
