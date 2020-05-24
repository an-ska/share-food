import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isFormFieldValid,
  areFormFieldsValid,
} from '../../services/validationService/validationService';
import { auth } from '../../store/actions/auth';
import { Redirect } from 'react-router-dom';
import './Auth.scss';
import FormField from '../../components/FormField/FormField';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';

const Auth = () => {
  const dispatch = useDispatch();
  const authenticate = (email, password, isSignedUp) =>
    dispatch(auth(email, password, isSignedUp));
  const isLoading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector(
    (state) => state.auth.accessToken !== null
  );
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const formFields = [];

  const initialState = {
    email: {
      tag: 'input',
      value: '',
      fieldConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      changed: false,
    },
    password: {
      tag: 'input',
      value: '',
      fieldConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      validation: {
        required: true,
        minLength: 6,
      },
      valid: false,
      changed: false,
    },
  };

  const [authData, setAuthData] = useState(initialState);

  // eslint-disable-next-line no-unused-vars
  for (let key in authData) {
    formFields.push({
      id: key,
      config: authData[key],
    });
  }

  const handleChange = (event, fieldId) => {
    const updatedAuthForm = {
      ...authData,
    };

    const updatedField = {
      ...updatedAuthForm[fieldId],
    };

    updatedField.value = event.target.value;
    updatedField.valid = isFormFieldValid(
      event.target.value,
      authData[fieldId].validation
    );
    updatedField.changed = true;

    updatedAuthForm[fieldId] = updatedField;

    setAuthData({ ...updatedAuthForm });
    setIsFormValid(areFormFieldsValid(updatedAuthForm));
  };

  const resetForm = () => {
    setAuthData(initialState);
    setIsFormValid(false);
  };

  const handleSubmit = (event) => {
    const { email, password } = authData;

    event.preventDefault();
    authenticate(email.value, password.value, isSignedUp);

    resetForm();
  };

  const switchAuthMode = () => {
    setIsSignedUp(!isSignedUp);
  };

  return (
    <>
      {isLoading ? (
        <Loader>LOADING LOADING LOADING...</Loader>
      ) : (
        <>
          <form onSubmit={(event) => handleSubmit(event)}>
            {formFields.map((field) => (
              <FormField
                key={field.id}
                tag={field.config.tag}
                config={field.config.fieldConfig}
                value={field.config.value}
                invalid={!field.config.valid}
                shouldValidate={field.config.validation}
                changed={field.config.changed}
                handleChange={(event) => handleChange(event, field.id)}
              />
            ))}
            <Button type="submit" disabled={!isFormValid}>
              SUBMIT
            </Button>
          </form>
          <Button type="submit" handleClick={switchAuthMode}>
            Go to {isSignedUp ? 'sign in' : 'sign up'}
          </Button>
        </>
      )}
      {isAuthenticated && <Redirect to="/offers" />}
    </>
  );
};

export default Auth;
