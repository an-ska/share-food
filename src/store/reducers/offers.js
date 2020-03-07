
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    offers: []
};

const setOffers = (state, action) => ({
    ...state,
    offers: action.offers
});

const removeOffers = (state, action) => {
    const updatedOffers = state.offers.filter(offer => offer.id !== action.offer);

    return {
        ...state,
        offers: updatedOffers
    }
};

const addOffer = (state, action) => {
    return {
        ...state,
        offers: [...state.offers, action.newOffer]
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.SET_OFFERS:
        return setOffers(state, action);
    case actionTypes.ADD_OFFER:
        return addOffer(state, action);
    case actionTypes.REMOVE_OFFER:
        return removeOffers(state, action);
    default:
        return state;
    }
};

export default reducer;
