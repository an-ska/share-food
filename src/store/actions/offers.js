import axios from "axios";
import * as actionTypes from "./actionTypes";
import { database as url } from "../../endpoints";

export const offersStart = () => ({
    type: actionTypes.OFFERS_START
});

export const setOffers = offers => ({
    type: actionTypes.SET_OFFERS,
    offers
});

export const offersFail = error => ({
    type: actionTypes.OFFERS_FAIL,
    error
})

export const getOffers = () => async dispatch => {
    dispatch(offersStart())

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
        dispatch(offersFail(error.response.status))
    }
};

export const addOffer = (details, id, redirectPath) => ({
    type: actionTypes.ADD_OFFER,
    offer: { ...details, id },
    redirectPath
});

export const postOffer = offer => async dispatch => {
    dispatch(offersStart());

    try {
        const response = await axios.post(`${url}/offers.json`, offer);
        const redirectPath = "/offers"

        dispatch(addOffer(offer, response.data.name, redirectPath));
    }
    catch (error) {
        dispatch(offersFail(error.response.status));
    }
};

export const removeOffer = offer => ({
    type: actionTypes.REMOVE_OFFER,
    offer
});

export const deleteOffer = offer => async dispatch => {
    dispatch(offersStart());

    try {
        await axios.delete("`${url}/offers/${offer}.json`")

        dispatch(removeOffer(offer));
    } catch (error) {
        dispatch(offersFail(error.response.status));
    }
};
