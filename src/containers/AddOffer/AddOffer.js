import React, { useState } from "react";
import "./AddOffer.scss";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { postOffer } from "../../store/actions/offers";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { isFormFieldValid, areFormFieldsValid } from "../../services/validationService";

const AddOffer = () => {
    const dispatch = useDispatch();
    const onPostOffer = offer => dispatch(postOffer(offer));
    const redirectPath = useSelector(state => state.offers.redirectPath)
    const isLoading = useSelector(state => state.offers.loading)
    const isError = useSelector(state => state.offers.error);
    const [isFormValid, setIsFormValid] = useState(false);

    const initialState = {
        title: {
            tag: "input",
            value: "",
            fieldConfig: {
                type: "text",
                placeholder: "Title..."
            },
            validation: {
                required: true,
            },
            valid: false,
            changed: false,
        },
        description: {
            tag: "textarea",
            value: "",
            fieldConfig: {
                type: null,
                placeholder: "Description..."
            },
            validation: {
                required: true,
                minLength: 15,
            },
            valid: false,
            changed: false,
        },
        availablePortions: {
            tag: "input",
            fieldConfig: {
                type: "text",
                placeholder: "Available portions..."
            },
            value: "",
            validation: {
                required: true,
                isNumeric: true,
            },
            valid: false,
            changed: false,
        },
        soldPortions: {
            tag: "input",
            value: "",
            fieldConfig: {
                type: "text",
                placeholder: "Sold portions..."
            },
            validation: {
                required: true,
                isNumeric: true,
            },
            valid: false,
            changed: false,
        },
        portionPrice: {
            tag: "input",
            value: "",
            fieldConfig: {
                type: "text",
                placeholder: "Price per portion..."
            },
            validation: {
                required: true,
                isNumeric: true,
            },
            valid: false,
            changed: false,
        },
        authorName: {
            tag: "input",
            value: "",
            fieldConfig: {
                type: "text",
                placeholder: "Your name..."
            },
            validation: {
                required: true,
            },
            valid: false,
            changed: false,
        }
    };

    const [offerData, setOfferData] = useState(initialState)

    const formFields = [];

    // eslint-disable-next-line no-unused-vars
    for (let key in offerData) {
        formFields.push({
            id: key,
            config: offerData[key]
        });
    }

    const handleChange = (event, fieldId) => {
        const updatedAddOfferForm = {
            ...offerData
        };

        const updatedField = {
            ...updatedAddOfferForm[fieldId]
        };

        updatedField.value = event.target.value;
        updatedField.valid = isFormFieldValid(
            event.target.value,
            offerData[fieldId].validation
        );
        updatedField.changed = true;

        updatedAddOfferForm[fieldId] = updatedField;

        setOfferData({ ...updatedAddOfferForm });
        setIsFormValid(areFormFieldsValid(updatedAddOfferForm));
    };

    const resetForm = () => {
        setOfferData(initialState);
        setIsFormValid(false);
    }

    const handleSubmit = event => {
        event.preventDefault();

        const formData = {};

        // eslint-disable-next-line no-unused-vars
        for (let fieldId in offerData) {
            formData[fieldId] = offerData[fieldId].value;
        }

        onPostOffer(formData);

        resetForm()
    };

    return (
        <>
            {
                isLoading
                    ? <Loader>LOADING LOADING LOADING...</Loader>
                    : (
                        <form onSubmit={event => handleSubmit(event)}>
                            { formFields.map(field => (
                                <FormField
                                    key={field.id}
                                    tag={field.config.tag}
                                    config={field.config.fieldConfig}
                                    value={field.config.value}
                                    invalid={!field.config.valid}
                                    shouldValidate={field.config.validation}
                                    changed={field.config.changed}
                                    handleChange={event => handleChange(event, field.id)}
                                />
                            ))}
                            <Button type="submit" disabled={!isFormValid}>add offer</Button>
                        </form>
                    )
            }
            { isError && <Message>Something went wrong. Offer cannot be added. Try again later.</Message> }
            { redirectPath && <Redirect to={redirectPath} /> }
        </>
    );
};

export default AddOffer;
