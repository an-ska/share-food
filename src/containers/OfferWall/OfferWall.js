import React, { useEffect, Fragment, useCallback } from "react";
import { Link } from "react-router-dom";
import "./OfferWall.scss";
import Offer from "../../components/Offer/Offer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { getOffers } from "../../store/actions/offers";
import { useDispatch, useSelector } from "react-redux";
import { deleteOffer } from "../../store/actions/offers";

const OfferWall = () => {
    const dispatch = useDispatch();
    const fetchOffers = useCallback(() => dispatch(getOffers()), [dispatch]);
    const isLoading = useSelector(state => state.offers.loading);
    const isError = useSelector(state => state.offers.error)
    const onDeleteOffer = id => dispatch(deleteOffer(id));

    useEffect(() => {
        fetchOffers()
    }, [fetchOffers]);

    const offers = useSelector(state => state.offers);

    const renderContent = () => {
        if (isError) {
            return <Message>Something went wrong. Try again later.</Message>
        }

        if (isLoading) {
            return <Loader>LOADING LOADING LOADING...</Loader>
        } else {
            return (
                <Fragment>
                    <Link to="/add-offer">ADD OFFER</Link>
                    { offers.offers.map(offer => (
                        <Offer
                            key={offer.id}
                            id={offer.id}
                            title={offer.title}
                            description={offer.description}
                            soldPortions={offer.soldPortions}
                            availablePortions={offer.availablePortions}
                            portionPrice={offer.portionPrice}
                            authorName={offer.authorName}
                            handleDelete={(id) => onDeleteOffer(id)}
                        />
                    )) }
                </Fragment>
            )
        }
    }

    return renderContent();
}

export default OfferWall;
