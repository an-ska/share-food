import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({ type = 'button', handleClick, disabled, children }) => (
  <button type={type} onClick={handleClick} disabled={disabled}>
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Button;
