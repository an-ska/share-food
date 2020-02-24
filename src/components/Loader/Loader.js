import React from "react";
import PropTypes from "prop-types";
import styles from "./Loader.module.css";

const Loader = ({ children }) => (
    <div className={styles.loader}>{children}</div>
);

Loader.propTypes = {
    children: PropTypes.string.isRequired
};

export default Loader;
