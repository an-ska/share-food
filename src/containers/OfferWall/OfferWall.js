import React, { useState, useEffect, Fragment, useCallback } from "react";
import { Link } from "react-router-dom";
import "./OfferWall.scss";
import Offer from "../../components/Offer/Offer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { getOffers } from "../../store/actions/offers";

import { useDispatch, useSelector } from "react-redux";

function OfferWall() {
    const dispatch = useDispatch();
    const fetchOffers = useCallback(() => dispatch(getOffers()), [dispatch]);
    const [isError, setIsError] = useState(false);
    const isLoading = useSelector( state => state.offers.loading);

    useEffect(() => {
        setIsError(false);
        fetchOffers()
    }, [fetchOffers]);

    const offers = useSelector(state => state.offers);

    return (
        <Fragment>
            { isError && <Message>Something went wrong...</Message> }
            { isLoading
                ? <Loader>LOADING LOADING LOADING...</Loader>
                : (
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
                            />
                        )) }
                    </Fragment>
                )
            }
        </Fragment>
    );
}

export default OfferWall;
