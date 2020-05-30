import React from 'react';
import './FormField.scss';
import PropTypes from 'prop-types';

const FormField = props => {
  const {
    tag,
    config,
    value,
    invalid,
    shouldValidate,
    changed,
    handleChange,
  } = props;
  const formFieldClasses = [];

  if (invalid && shouldValidate && changed) {
    formFieldClasses.push('invalid');
  }

  const mapIntoFormField = () => {
    switch (tag) {
      case 'input':
        return (
          <input
            className={formFieldClasses.join(' ')}
            {...config}
            value={value}
            onChange={handleChange}
          />
        );
      case 'textarea':
        return (
          <textarea
            className={formFieldClasses.join(' ')}
            {...config}
            value={value}
            onChange={handleChange}
          />
        );
      default:
        return (
          <input
            className={formFieldClasses.join(' ')}
            {...config}
            value={value}
            onChange={handleChange}
          />
        );
    }
  };

  const formField = mapIntoFormField(props);

  return formField;
};

FormField.propTypes = {
  tag: PropTypes.string.isRequired,
  config: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  invalid: PropTypes.bool.isRequired,
  shouldValidate: PropTypes.object.isRequired,
  changed: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FormField;
