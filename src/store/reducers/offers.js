
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    offers: [],
    loading: false,
    error: false,
    orderErrors: [],
    redirectPath: "",
};

const offersStart = state => ({
    ...state,
    loading: true,
    error: false,
    orderErrors: [],
    redirectPath: ""
});

const setOffers = (state, action) => ({
    ...state,
    offers: action.offers,
    loading: false
});

const offersFail = (state, action) => ({
    ...state,
    loading: false,
    error: action.error
});

const orderFails = (state, action) => ({
    ...state,
    loading: false,
    orderErrors: [...state.orderErrors, action.orderError],
});

const removeOffers = (state, action) => ({
    ...state,
    offers: state.offers.filter(offer => offer.id !== action.offer),
    loading: false
});

const addOffer = (state, action) => ({
    ...state,
    offers: [...state.offers, action.offer],
    loading: false,
    redirectPath: action.redirectPath
});

const updateOffers = (state, action) => ({
    ...state,
    offers: state.offers.map(offer => offer.id === action.order.id ? { ...offer, soldPortions: action.order.soldPortions, boughtBy: action.order.boughtBy } : offer),
    loading: false,
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.OFFERS_START:
        return offersStart(state);
    case actionTypes.SET_OFFERS:
        return setOffers(state, action);
    case actionTypes.OFFERS_FAIL:
        return offersFail(state, action);
    case actionTypes.ORDER_FAILS:
        return orderFails(state, action);
    case actionTypes.ADD_OFFER:
        return addOffer(state, action);
    case actionTypes.REMOVE_OFFER:
        return removeOffers(state, action);
    case actionTypes.UPDATE_OFFERS:
        return updateOffers(state, action);
    default:
        return state;
    }
};

export default reducer;
