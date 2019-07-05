import React from 'react';
import PropTypes from 'prop-types';

import requestHOC from '../HOC/withUserPage';

export const RequestForm = ({
  onChange, onSubmit, message, pathname, request,
}) => (
  <div id="request-modal" className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <h2>FixZit</h2>
      </div>
      <div className="modal-body">
        <h3>{pathname === '/request/edit' ? 'Edit' : 'Create'} request</h3>
        <div>
          {message ? <p id="formPopup">{message}</p> : ''}
        </div>
        <form
          onSubmit={onSubmit}
        >

          <label htmlFor="title">
            <input
              onChange={e => onChange(e)}
              type="text"
              id="request-title"
              key={request !== null ? request.request_title : ''}
              name="title"
              placeholder="Your request title.."
              defaultValue={request !== null ? request.request_title : ''}
              required
            />
          </label>

          <label htmlFor="dept">
              Department
            <select
              name="department"
              onChange={e => onChange(e)}
              id="dept"
              key={request !== null ? request.department : ''}
              defaultValue={request !== null ? request.department : ''}
            >
              <option value="maintenance">Maintenance</option>
              <option value="Repairs">Repairs</option>
            </select>
          </label>


          <label htmlFor="content">
            <textarea
              onChange={e => onChange(e)}
              id="subject"
              name="content"
              placeholder="Tell us about your request.."
              style={{ height: '200px' }}
              key={request !== null ? request.request_content : ''}
              defaultValue={request !== null ? request.request_content : ''}
              required
            />
          </label>

          <button id="sendRequest" className="btn btn-send" type="submit">{pathname === '/request/edit' ? 'Update' : 'Send'} Request</button>

        </form>
      </div>
    </div>
  </div>
);

RequestForm.defaultProps = {
  request: null,
};

RequestForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  request: PropTypes.any,
};

const ProfileWithRequestForm = requestHOC(RequestForm);

export default ProfileWithRequestForm;
