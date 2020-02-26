import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Auth.css";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { auth } from "../../store/actions/auth";

const Auth = () => {
    const dispatch = useDispatch();
    const authenticate = (email, password) => dispatch(auth(email, password));

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
            },
        }
    })

    const formFields = []

    for (let key in authData.authForm) {
        formFields.push({
            id: key,
            config: authData.authForm[key]
        })
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
        const { email, password } = authData.authForm

        event.preventDefault();
        authenticate(email.value, password.value);
    };

    return (
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
            <Button type="submit">Login</Button>
        </form>
    );
};

export default Auth;
