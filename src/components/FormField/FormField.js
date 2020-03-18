import React from "react";
import "./FormField.scss";
import PropTypes from "prop-types";

const FormField = props => {
    let formField = null;

    const { tag, config, value, invalid, shouldValidate, handleChange } = props;

    const formFieldClasses = [];

    if (invalid && shouldValidate) {
        formFieldClasses.push('invalid');
    }

    switch (tag) {
    case "input":
        formField = (
            <input
                className={formFieldClasses.join(" ")}
                {...config}
                value={value}
                onChange={handleChange}
            />
        );
        break;
    case "textarea":
        formField = (
            <textarea
                className={formFieldClasses.join(" ")}
                {...config}
                value={value}
                onChange={handleChange}
            />
        );
        break;
    default:
        formField = (
            <input
                className={formFieldClasses.join(" ")}
                {...config}
                value={value}
                onChange={handleChange}
            />
        );
    }

    return <div>{formField}</div>;
};

FormField.propTypes = {
    tag: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    value: PropTypes.string,
    invalid: PropTypes.bool,
    shouldValidate: PropTypes.bool,
    handleChange: PropTypes.func.isRequired
}

export default FormField;
