import React from 'react';
import PropTypes from 'prop-types';
import styles from './Heading.module.scss';

const Heading = ({ children }) => (
  <div className={styles['heading']}>{children}</div>
);

Heading.propTypes = {
  children: PropTypes.array,
};
export default Heading;
