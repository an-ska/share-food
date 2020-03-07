import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AddOffer.css";
import FormField from "../../components/FormField/FormField";
import Button from "../../components/Button/Button";
import { postOffer } from "../../store/actions/offers";
import { useDispatch } from "react-redux";


const AddOffer = () => {
    const dispatch = useDispatch();
    const onPostOffer = offer => dispatch(postOffer(offer));

    let history = useHistory();
    const [offerData, setOfferData] = useState({
        addOfferForm: {
            title: {
                tag: "input",
                fieldConfig: {
                    type: "text",
                    placeholder: "Title..."
                },
                value: ""
            },
            description: {
                tag: "textarea",
                fieldConfig: {
                    type: null,
                    placeholder: "Description..."
                },
                value: ""
            },
            availablePortions: {
                tag: "input",
                fieldConfig: {
                    type: "number",
                    placeholder: "Available portions..."
                },
                value: ""
            },
            soldPortions: {
                tag: "input",
                fieldConfig: {
                    type: "number",
                    placeholder: "Sold portions..."
                },
                value: "0"
            },
            portionPrice: {
                tag: "input",
                fieldConfig: {
                    type: "number",
                    placeholder: "Price per portion..."
                },
                value: ""
            },
            authorName: {
                tag: "input",
                fieldConfig: {
                    type: "text",
                    placeholder: "Your name..."
                },
                value: ""
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
        history.push("/offers")
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
            <Button type="submit">add offer</Button>
        </form>
    );
};

export default AddOffer;
