import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const Loader = ({ type, color }) => (
  <ReactLoading type={type} color={color} height="5%" width="20%" />
);

Loader.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default Loader;
