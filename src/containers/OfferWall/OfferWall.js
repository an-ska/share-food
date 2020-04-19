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
                orderedBy: [userId],
                soldPortions: parseInt(offer.soldPortions) + 1
            }
        })

        onOrder(order)
    }

    const handleAddToCart = id => {
        const offerAddedToCart = offers.offers.find(offer => offer.id === id);

        setCartOffers([...cartOffers, offerAddedToCart])
    }

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
                    {offers.offers.map(offer =>
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
                                handleClick={() => handleAddToCart(offer.id)}
                            >ADD TO CART</Button>
                        </Offer>
                    )}
                    <aside>
                        {cartOffers.map(offer =>
                            <div key={offer.id}>
                                <p>{offer.title}</p>
                                <p>{offer.description}</p>
                                <p>{offer.portionPrice} zł</p>
                                <p>{offer.authorName}</p>
                            </div>
                        )}
                        <Button handleClick={handleOrder}>ORDER</Button>
                    </aside>
                </>
            );
        }
    }

    return renderContent();
}

export default OfferWall;
