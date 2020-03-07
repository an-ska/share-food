import axios from "axios";
import * as actionTypes from "./actionTypes";
import { database as url } from "../../endpoints";

export const setOffers = offers => ({
    type: actionTypes.SET_OFFERS,
    offers
});

export const getOffers = () => async dispatch => {
    try {
        const response = await axios.get(`${url}/offers.json`);
        let offers = [];

        Object.keys(response.data).forEach(key => {
            const offer = {
                ...response.data[key],
                id: key
            };

            offers.push(offer);
        });

        dispatch(setOffers(offers));
    } catch (error) {
        console.log(error);
    }
};

export const addOffer = (details, id) => ({
    type: actionTypes.ADD_OFFER,
    offer: { ...details, id }
});

export const postOffer = offer => async dispatch => {
    try {
        const response = await axios.post(`${url}/offers.json`, offer);

        dispatch(addOffer(offer, response.data.name));
    } catch (error) {
        console.log(error);
    }
};

export const removeOffer = offer => ({
    type: actionTypes.REMOVE_OFFER,
    offer
});

export const deleteOffer = offer => async dispatch => {
    try {
        await axios.delete(`${url}/offers/${offer}.json`);

        dispatch(removeOffer(offer));
    } catch (error) {
        console.log(error);
    }
};
