import React from 'react';
import PropTypes from 'prop-types';
import styles from './FormField.module.scss';

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
          <span
            className={`${styles['input']} ${
              styles[formFieldClasses.join(' ')]
            }`}
          >
            <input {...config} value={value} onChange={handleChange} />
          </span>
        );
      case 'textarea':
        return (
          <span
            className={`${styles['input']} ${
              styles[formFieldClasses.join(' ')]
            }`}
          >
            <textarea {...config} value={value} onChange={handleChange} />
          </span>
        );
      default:
        return (
          <span
            className={`${styles['input']} ${
              styles[formFieldClasses.join(' ')]
            }`}
          >
            <input {...config} value={value} onChange={handleChange} />
          </span>
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
