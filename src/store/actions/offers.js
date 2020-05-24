import axios from 'axios';
import * as actionTypes from './actionTypes';
import { database as url } from '../../endpoints';

const getAccessToken = () => `?auth=${localStorage.getItem('accessToken')}`;

export const offersStart = () => ({
	type: actionTypes.OFFERS_START,
});

export const setOffers = offers => ({
	type: actionTypes.SET_OFFERS,
	offers,
});

export const offersFail = error => ({
	type: actionTypes.OFFERS_FAIL,
	error,
});

export const orderFails = error => ({
	type: actionTypes.ORDER_FAILS,
	orderError: error,
});

const createOffers = response =>
	Object.entries(response).map(pair => {
		return {
			id: pair[0],
			...pair[1],
		};
	});

export const getOffers = () => async dispatch => {
	dispatch(offersStart());

	try {
		const response = await axios.get(`${url}/offers.json${getAccessToken()}`);

		const offers = createOffers(response.data);

		dispatch(setOffers(offers));
	} catch (error) {
		dispatch(offersFail(error.response.status));
	}
};

export const addOffer = (details, id, redirectPath) => ({
	type: actionTypes.ADD_OFFER,
	offer: { ...details, id },
	redirectPath,
});

export const postOffer = offer => async dispatch => {
	dispatch(offersStart());

	try {
		const response = await axios.post(
			`${url}/offers.json${getAccessToken()}`,
			offer
		);
		const redirectPath = '/offers';

		dispatch(addOffer(offer, response.data.name, redirectPath));
	} catch (error) {
		dispatch(offersFail(error.response.status));
	}
};

export const removeOffer = offer => ({
	type: actionTypes.REMOVE_OFFER,
	offer,
});

export const deleteOffer = offer => async dispatch => {
	dispatch(offersStart());

	try {
		await axios.delete(`${url}/offers/${offer}.json${getAccessToken()}`);

		dispatch(removeOffer(offer));
	} catch (error) {
		dispatch(offersFail(error.response.status));
	}
};

export const updateOffers = order => ({
	type: actionTypes.UPDATE_OFFERS,
	order,
});

export const postOrder = orders => dispatch => {
	dispatch(offersStart());

	orders.map(async order => {
		try {
			const response = await axios.patch(
				`${url}/offers/${order.orderId}.json${getAccessToken()}`,
				{
					id: order.orderId,
					boughtBy: order.boughtBy,
					soldPortions: order.soldPortions,
				}
			);

			dispatch(updateOffers(response.data));
		} catch (error) {
			dispatch(orderFails(order.title));
		}
	});
};

export const setCartOffers = id => ({
	type: actionTypes.SET_CART_OFFERS,
	id,
});

export const clearCartOffers = () => ({
	type: actionTypes.CLEAR_CART_OFFERS,
});

export const increaseCartOffer = id => ({
	type: actionTypes.INCREASE_CART_OFFER,
	id,
});

export const decreaseCartOffer = id => ({
	type: actionTypes.DECREASE_CART_OFFER,
	id,
});

export const removeCartOffer = id => ({
	type: actionTypes.REMOVE_CART_OFFER,
	id,
});

export const setImpossibleOrderMessage = state => ({
	type: actionTypes.SET_IMPOSSIBLE_ORDER_MESSAGE,
	state,
});
