import React, { useState } from "react";
import "./AddOffer.scss";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { postOffer } from "../../store/actions/offers";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import isFormFieldValid from "../../services/validationService";

const AddOffer = () => {
    const dispatch = useDispatch();
    const onPostOffer = offer => dispatch(postOffer(offer));
    const redirectPath = useSelector(state => state.offers.redirectPath)
    const isLoading = useSelector(state => state.offers.loading)
    const isError = useSelector(state => state.offers.error);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [offerData, setOfferData] = useState({
        addOfferForm: {
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
                valid: true,
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
                valid: true
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
                valid: true
            },
            soldPortions: {
                tag: "input",
                value: "0",
                fieldConfig: {
                    type: "text",
                    placeholder: "Sold portions..."
                },
                validation: {
                    required: true,
                    isNumeric: true,
                },
                valid: true
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
                valid: true,
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
                valid: true
            }
        }
    });

    const formFields = [];

    for (let key in offerData.addOfferForm) {
        formFields.push({
            id: key,
            config: offerData.addOfferForm[key]
        });
    }

    const handleChange = (event, fieldId) => {
        const updatedAddOfferForm = {
            ...offerData.addOfferForm
        };

        const updatedField = {
            ...updatedAddOfferForm[fieldId]
        };

        updatedField.value = event.target.value;
        updatedField.valid = isFormFieldValid(
            event.target.value,
            offerData.addOfferForm[fieldId].validation
        );

        updatedAddOfferForm[fieldId] = updatedField;

        setOfferData({ addOfferForm: updatedAddOfferForm });
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = {};

        for (let fieldId in offerData.addOfferForm) {
            formData[fieldId] = offerData.addOfferForm[fieldId].value;
        }

        onPostOffer(formData);
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
                                    value={field.value}
                                    invalid={!field.config.valid}
                                    shouldValidate={field.config.validation}
                                    handleChange={event => handleChange(event, field.id)}
                                />
                            ))}
                            <Button type="submit" disabled={isButtonDisabled}>add offer</Button>
                        </form>
                    )
            }
            { isError && <Message>Something went wrong. Offer cannot be added. Try again later.</Message> }
            { redirectPath && <Redirect to={redirectPath} /> }
        </>
    );
};

export default AddOffer;
