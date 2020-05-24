import React, { useEffect, useCallback } from 'react';
import './OfferWall.scss';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Offer from '../Offer/Offer';
import Loader from '../Loader/Loader';
import {
	getOffers,
	setCartOffers,
	increaseCartOffer,
} from '../../store/actions/offers';
import Button from '../Button/Button';

const OfferWall = () => {
	const dispatch = useDispatch();
	const fetchOffers = useCallback(() => dispatch(getOffers()), [dispatch]);
	const isLoading = useSelector(state => state.offers.loading);
	const onSetCartOffers = offers => dispatch(setCartOffers(offers));
	const onIncreaseCartOffer = id => dispatch(increaseCartOffer(id));

	useEffect(() => {
		fetchOffers();
	}, [fetchOffers]);

	const offers = useSelector(state => state.offers.offers);
	const cartOffers = useSelector(state => state.offers.cartOffers);

	const handleAddToCart = id => {
		const offerIsAlreadyInCart = cartOffers.find(offer => offer.id === id);

		if (offerIsAlreadyInCart) {
			onIncreaseCartOffer(id);

			return;
		}

		onSetCartOffers(id);
	};

	const renderContent = () => {
		if (isLoading) {
			return <Loader>LOADING LOADING LOADING...</Loader>;
		} else {
			return (
				<>
					{offers.map(offer => (
						<Offer
							key={offer.id}
							id={offer.id}
							title={offer.title}
							description={offer.description}
							soldPortions={offer.soldPortions}
							availablePortions={offer.availablePortions}
							portionPrice={offer.portionPrice}
							authorName={offer.authorName}
						>
							<Button
								className='offer-order-button'
								disabled={offer.soldPortions === offer.availablePortions}
								handleClick={() => handleAddToCart(offer.id)}
							>
								<FontAwesomeIcon icon='shopping-cart' />
								ADD TO CART
							</Button>
						</Offer>
					))}
				</>
			);
		}
	};

	return renderContent();
};

export default OfferWall;
