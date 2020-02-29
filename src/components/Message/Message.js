import React from "react";
import PropTypes from "prop-types";
import styles from "./Message.module.css";

const Message = ({ children }) => (
    <div className={styles.message}>{children}</div>
);

Message.propTypes = {
    children: PropTypes.string.isRequired
};

export default Message;
