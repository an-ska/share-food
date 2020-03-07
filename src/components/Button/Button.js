import React from "react";
import PropTypes from "prop-types";
import "./Button.scss";

const Button = ({ type = "button", handleClick, children }) => (
    <button type={type} onClick={handleClick}>
        {children}
    </button>
);

Button.propTypes = {
    type: PropTypes.string,
    handleClick: PropTypes.func,
    children: PropTypes.string.isRequired,
};

export default Button;
