import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.scss";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { auth } from "../../store/actions/auth";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import isFormFieldValid from "../../services/validationService";

const Auth = () => {
    const dispatch = useDispatch();
    const authenticate = (email, password, isSignedUp) =>
        dispatch(auth(email, password, isSignedUp));
    const isLoading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.accessToken !== null);
    const [isSignedUp, setIsSignedUp] = useState(true);
    const [isFormValid, setIsFormValid] = useState(false);
    const formFields = [];

    const [authData, setAuthData] = useState({
        authForm: {
            email: {
                tag: "input",
                value: "",
                fieldConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                tag: "input",
                value: "",
                fieldConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            }
        }
    });

    for (let key in authData.authForm) {
        formFields.push({
            id: key,
            config: authData.authForm[key]
        });
    }

    const handleChange = (event, fieldId) => {
        const updatedAuthForm = {
            ...authData.authForm
        };

        const updatedField = {
            ...updatedAuthForm[fieldId]
        };

        updatedField.value = event.target.value;
        updatedField.valid = isFormFieldValid(
            event.target.value,
            authData.authForm[fieldId].validation
        );
        updatedField.changed = true;

        updatedAuthForm[fieldId] = updatedField;

        const areFormFieldsValid = Object.values(updatedAuthForm).every(
            field => field.valid === true
        );

        setAuthData({ authForm: updatedAuthForm });
        setIsFormValid(areFormFieldsValid);
    };

    const handleSubmit = event => {
        const { email, password } = authData.authForm;

        event.preventDefault();
        authenticate(email.value, password.value, isSignedUp);
    };

    const switchAuthMode = () => {
        setIsSignedUp(!isSignedUp);
    };

    return (
        <>
            { isLoading
                ? <Loader>LOADING LOADING LOADING...</Loader>
                : (
                    <form onSubmit={event => handleSubmit(event)}>
                        {formFields.map(field => (
                            <FormField
                                key={field.id}
                                tag={field.config.tag}
                                config={field.config.fieldConfig}
                                value={field.value}
                                invalid={!field.config.valid}
                                shouldValidate={field.config.validation}
                                changed={field.config.changed}
                                handleChange={event => handleChange(event, field.id)}
                            />
                        ))}
                        <Button type="submit" disabled={!isFormValid}>SUBMIT</Button>
                        <button type="submit" onClick={switchAuthMode}>Go to {isSignedUp ? "sign in" : "sign up"}</button>
                    </form>
                )
            }
            { isAuthenticated && <Redirect to="/offers" /> }
        </>
    );
};

export default Auth;
