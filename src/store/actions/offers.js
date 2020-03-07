import axios from "axios";
import * as actionTypes from "./actionTypes";

export const setOffers = offers => ({
    type: actionTypes.SET_OFFERS,
    offers
})

export const removeOffer = offer => ({
    type: actionTypes.REMOVE_OFFER,
    offer
})

export const deleteOffer = offer => dispatch => {
    axios
        .delete(`https://sharefood-f4865.firebaseio.com/offers/${offer}.json`)
        .then(() => {
            dispatch(removeOffer(offer))
        })
        .catch(error => {
            console.log(error)
        })
}
export const addOffer = (details, id) => {
    const newOffer = {
        ...details,
        id
    };

    return {
        type: actionTypes.ADD_OFFER,
        newOffer
    }
}

export const postOffer = offer => dispatch => {
    axios
        .post("https://sharefood-f4865.firebaseio.com/offers.json", offer)
        .then(response => {
            dispatch(addOffer(offer, response.data.name))
        })
}

export const getOffers = () => dispatch => {
    axios
        .get("https://sharefood-f4865.firebaseio.com/offers.json")
        .then(response => {
            let offers = [];

            Object.keys(response.data).forEach(key => {
                const offer = {
                    ...response.data[key],
                    id: key
                };

                offers.push(offer);
            });

            dispatch(setOffers(offers));
        });
};
