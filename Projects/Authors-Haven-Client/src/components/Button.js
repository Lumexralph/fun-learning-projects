import React from 'react';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const AppButton = ({ text, onClick, ...props }) => (
  <Button id="button" onClick={onClick} {...props}>
    <span>{text}</span>
  </Button>
);

export default AppButton;

AppButton.defaultProps = {
  onClick: null,
  floated: null,
  className: null,
};

AppButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  floated: PropTypes.string,
  className: PropTypes.string,
};
