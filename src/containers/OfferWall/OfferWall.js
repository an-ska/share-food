import React, { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import "./OfferWall.scss";
import Offer from "../../components/Offer/Offer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { getOffers } from "../../store/actions/offers";
import { postOrder } from "../../store/actions/offers";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button/Button";

const OfferWall = () => {
    const dispatch = useDispatch();
    const fetchOffers = useCallback(() => dispatch(getOffers()), [dispatch]);
    const isLoading = useSelector(state => state.offers.loading);
    const isError = useSelector(state => state.offers.error)
    const userId = useSelector(state => state.auth.userId);
    const onOrder = order => dispatch(postOrder(order));
    const [cartOffers, setCartOffers] = useState([]);

    useEffect(() => {
        fetchOffers()
    }, [fetchOffers]);

    const offers = useSelector(state => state.offers);

    const handleOrder = () => {
        const order = cartOffers.map(offer => {
            return {
                orderId: offer.id,
                boughtBy: [...offer.boughtBy, userId],
                soldPortions: offer.soldPortions
            }
        })

        onOrder(order)

        setCartOffers([])
    }

    const handleAddToCart = id => {
        const addToCartOffer = offers.offers.find(offer => offer.id === id);
        addToCartOffer.soldPortions = `${parseInt(addToCartOffer.soldPortions) + 1}`;

        const offerIsAlreadyInCart = cartOffers.find((offer) => offer.id === id);

        if (offerIsAlreadyInCart) {
            const updatedCartOffers = [...cartOffers];
            const updatedCartOffer = updatedCartOffers.find(
                (offer) => offer.id === id
            );

            updatedCartOffer.soldPortions = `${parseInt(updatedCartOffer.soldPortions) + 1}`;
            updatedCartOffer.cartQuantity++;

            setCartOffers([...updatedCartOffers]);

            return;
        }

        addToCartOffer.cartQuantity = 1;

        setCartOffers([...cartOffers, addToCartOffer]);
    }

    const handleRemoveFromCart = id => {
        const removeFromCartOffer = offers.offers.find(offer => offer.id === id);
        removeFromCartOffer.soldPortions = `${
            parseInt(removeFromCartOffer.soldPortions) - removeFromCartOffer.cartQuantity
        }`;
        removeFromCartOffer.cartQuantity = 0;

        const updatedCartOffers = cartOffers.filter(offer => offer.id !== id)

        setCartOffers([...updatedCartOffers]);
    }

    const handleQuantityDecrease = id => {
        const offer = offers.offers.find((offer) => offer.id === id);
        offer.soldPortions = `${parseInt(offer.soldPortions) - 1}`;

        const updatedCartOffers = [...cartOffers];
        const updatedCartOffer = updatedCartOffers.find(
            (offer) => offer.id === id
        );

        updatedCartOffer.cartQuantity--;

        if (updatedCartOffer.cartQuantity === 0) {
            const updatedCartOffers = cartOffers.filter(offer => offer.id !== id)

            setCartOffers([...updatedCartOffers]);
            return;
        }

        setCartOffers([...updatedCartOffers]);
    }

    const handleQuantityIncrease = (id) => {
        const offer = offers.offers.find((offer) => offer.id === id);
        offer.soldPortions = `${parseInt(offer.soldPortions) + 1}`;

        const updatedCartOffers = [...cartOffers];
        const updatedCartOffer = updatedCartOffers.find(
            (offer) => offer.id === id
        );

        updatedCartOffer.cartQuantity++;

        setCartOffers([...updatedCartOffers]);
    };

    const renderContent = () => {
        if (isError) {
            return <Message>Something went wrong. Try again later.</Message>
        }

        if (isLoading) {
            return <Loader>LOADING LOADING LOADING...</Loader>
        } else {
            return (
                <>
                    <Link to="/add-offer">ADD OFFER</Link>
                    {offers.offers.map((offer) => (
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
                      ADD TO CART
                            </Button>
                        </Offer>
                    ))}
                    <aside>
                        {cartOffers.map((offer) => (
                            <div key={offer.id}>
                                <p>{offer.title}</p>
                                <p>{offer.description}</p>
                                <p>{offer.portionPrice} zł</p>
                                <p>{offer.authorName}</p>
                                {offer.cartQuantity && (
                                    <p>quantity: {offer.cartQuantity}</p>
                                )}
                                <Button
                                    handleClick={() => handleQuantityIncrease(offer.id)}
                                    disabled={
                                        offer.soldPortions === offer.availablePortions
                                    }
                                >+</Button>
                                <Button
                                    handleClick={() => handleQuantityDecrease(offer.id)}
                                >-</Button>
                                <Button
                                    handleClick={() => handleRemoveFromCart(offer.id)}
                                >x</Button>
                            </div>
                        ))}
                        <Button handleClick={handleOrder}>ORDER</Button>
                    </aside>
                </>
            );
        }
    }

    return renderContent();
}

export default OfferWall;
