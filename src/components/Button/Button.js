import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

const Button = ({ type = 'button', handleClick, disabled, children }) => (
  <button
    type={type}
    onClick={handleClick}
    disabled={disabled}
    className={styles.button}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string,
  handleClick: PropTypes.func,
  disabled: PropTypes.bool,
  styles: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
