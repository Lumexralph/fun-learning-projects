import React from 'react';
import PropTypes from 'prop-types';

import Loader from './Loader';

const ShowLoadingStatus = ({
  status,
  text,
}) => {
  if (status) {
    return (<div className="loader"><Loader type="bubbles" color="lightblue" /></div>);
  }
  if (text) {
    return (
      <div className="loader-text"><p>{text}</p></div>
    );
  }
  return null;
};

ShowLoadingStatus.defaultProps = {
  text: null,
};

ShowLoadingStatus.propTypes = {
  status: PropTypes.bool.isRequired,
  text: PropTypes.any,
};

export default ShowLoadingStatus;
