import React from "react";
import "./FormField.css";
import PropTypes from "prop-types";

const FormField = props => {
    let formField = null;

    const { tag, config, value, handleChange } = props;

    switch (tag) {
    case "input":
        formField = (
            <input {...config} value={value} onChange={handleChange} />
        );
        break;
    case "textarea":
        formField = (
            <textarea {...config} onChange={handleChange} />
        );
        break;
    default:
        formField = (
            <input {...config} value={value} onChange={handleChange} />
        );
    }

    return <div>{formField}</div>;
};

FormField.propTypes = {
    tag: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired
}

export default FormField;
