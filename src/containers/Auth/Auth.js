import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { auth } from "../../store/actions/auth";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

const Auth = () => {
    const dispatch = useDispatch();
    const authenticate = (email, password, isSignedUp) =>
        dispatch(auth(email, password, isSignedUp));
    const isLoading = useSelector(state => state.auth.loading);
    const isAuthenticated = useSelector(state => state.auth.accessToken !== null);
    const [isSignedUp, setIsSignedUp] = useState(true);
    const formFields = [];

    const [authData, setAuthData] = useState({
        authForm: {
            email: {
                tag: "input",
                fieldConfig: {
                    type: "email",
                    placeholder: "Email"
                },
                value: ""
            },
            password: {
                tag: "input",
                fieldConfig: {
                    type: "password",
                    placeholder: "Password"
                },
                value: ""
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
        updatedAuthForm[fieldId] = updatedField;

        setAuthData({ authForm: updatedAuthForm });
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
        <Fragment>
            {isLoading ? (
                <Loader>LOADING LOADING LOADING...</Loader>
            ) : (
                <form onSubmit={event => handleSubmit(event)}>
                    {formFields.map(field => (
                        <FormField
                            key={field.id}
                            tag={field.config.tag}
                            config={field.config.fieldConfig}
                            value={field.value}
                            handleChange={event => handleChange(event, field.id)}
                        />
                    ))}
                    <Button type="submit">SUBMIT</Button>
                    <button type="submit" onClick={switchAuthMode}>
            Go to {isSignedUp ? "sign in" : "sign up"}
                    </button>
                </form>
            )}
            {isAuthenticated && <Redirect to="/offers" />}
        </Fragment>
    );
};

export default Auth;
