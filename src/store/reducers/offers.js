
import * as actionTypes from "../actions/actionTypes";

const initialState = {
    offers: [],
    cartOffers: [],
    loading: false,
    error: false,
    orderErrors: [],
    redirectPath: "",
    setImpossibleOrderMessage: false,
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

const setCartOffers = (state, action) => ({
    ...state,
    cartOffers: [...state.cartOffers, action.cartOffers],
});

const clearCartOffers = (state) => ({
    ...state,
    cartOffers: [],
});

const increaseCartOffer = (state, action) => ({
    ...state,
    cartOffers: state.cartOffers.map(offer =>
        offer.id === action.id
            ? {
                ...offer,
                soldPortions: offer.soldPortions + 1,
                cartQuantity: offer.cartQuantity + 1
            }
            : offer
    )
})

const decreaseCartOffer = (state, action) => ({
    ...state,
    cartOffers: state.cartOffers.map((offer) =>
        offer.id === action.id
            ? {
                ...offer,
                soldPortions: offer.soldPortions - 1,
                cartQuantity: offer.cartQuantity - 1,
            }
            : offer
    ),
});

const removeCartOffer = (state, action) => ({
    ...state,
    cartOffers: state.cartOffers.filter((offer) => offer.id !== action.id),
});

const setImpossibleOrderMessage = (state, action) => ({
    ...state,
    impossibleOrder: action.state
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
    case actionTypes.SET_CART_OFFERS:
        return setCartOffers(state, action);
    case actionTypes.CLEAR_CART_OFFERS:
        return clearCartOffers(state);
    case actionTypes.INCREASE_CART_OFFER:
        return increaseCartOffer(state, action);
    case actionTypes.DECREASE_CART_OFFER:
        return decreaseCartOffer(state, action);
    case actionTypes.REMOVE_CART_OFFER:
        return removeCartOffer(state, action);
    case actionTypes.SET_IMPOSSIBLE_ORDER_MESSAGE:
        return setImpossibleOrderMessage(state, action);
    default:
        return state;
    }
};

export default reducer;
