import React, { useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./OfferWall.scss";
import Offer from "../../components/Offer/Offer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { getOffers, setCartOffers, increaseCartOffer } from "../../store/actions/offers";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cart from '../Cart/Cart';

const OfferWall = () => {
    const dispatch = useDispatch();
    const fetchOffers = useCallback(() => dispatch(getOffers()), [dispatch]);
    const isLoading = useSelector(state => state.offers.loading);
    const isError = useSelector(state => state.offers.error);
    const orderErrors = useSelector(state => state.offers.orderErrors);
    const impossibleOrderMessage = useSelector(state => state.offers.impossibleOrderMessage);
    const onSetCartOffers = (offers) => dispatch(setCartOffers(offers));
    const onIncreaseCartOffer = (id) => dispatch(increaseCartOffer(id));

    useEffect(() => {
        fetchOffers()
    }, [fetchOffers]);

    const offers = useSelector(state => state.offers.offers);
    const cartOffers = useSelector((state) => state.offers.cartOffers);

    const handleAddToCart = id => {
        const offerIsAlreadyInCart = cartOffers.find((offer) => offer.id === id);

        if (offerIsAlreadyInCart) {
            onIncreaseCartOffer(id)

            return;
        }

        onSetCartOffers(id);
    }

    const renderContent = () => {
        if (isError) {
            return <Message>Something went wrong. Try again later.</Message>;
        }

        if (orderErrors.length) {
            return (
                <Message>
                Try again later. The following offers cannot be ordered now:
                    <ul>
                        {orderErrors.map((offer) => (
                            <li key={offer}>{offer}</li>
                        ))}
                    </ul>
                </Message>
            );
        }

        if (impossibleOrderMessage) {
            return <Message>Your order cannot be processed. Try again later.</Message>
        }

        if (isLoading) {
            return <Loader>LOADING LOADING LOADING...</Loader>;
        } else {
            return (
                <>
                    <Link to="/add-offer">ADD OFFER</Link>
                    {offers.map((offer) => (
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
                                className="offer-order-button"
                                disabled={offer.soldPortions === offer.availablePortions}
                                handleClick={() => handleAddToCart(offer.id)}
                            >
                                <FontAwesomeIcon icon="shopping-cart" />
                    ADD TO CART
                            </Button>
                        </Offer>
                    ))}
                    <Cart />
                </>
            );
        }
    }

    return renderContent();
}

export default OfferWall;
