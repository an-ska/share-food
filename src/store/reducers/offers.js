
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    offers: [],
    loading: false,
};

const start = state => ({
    ...state,
    loading: true,
})

const setOffers = (state, action) => ({
    ...state,
    offers: action.offers,
    loading: false
});

const removeOffers = (state, action) => ({
    ...state,
    offers: state.offers.filter(offer => offer.id !== action.offer),
    loading: false
});

const addOffer = (state, action) => ({
    ...state,
    offers: [...state.offers, action.offer],
    loading: false
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.START:
        return start(state);
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
