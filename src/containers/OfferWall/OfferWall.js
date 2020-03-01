import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import "./OfferWall.css";
import Offer from "../../components/Offer/Offer";
import Button from "../../components/Button/Button";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";
import { getOffers } from "../../services/OffersService";

function OfferWall() {
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        const fetchData = async () => {
            try {
                await getOffers(setOffers);
            } catch (error) {
                setIsError(true);
            }
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Fragment>
            {isError && <Message>Something went wrong...</Message>}
            {isLoading ? (
                <Loader>LOADING LOADING LOADING...</Loader>
            ) : (
                <Fragment>
                    <Link to="/add-offer">ADD OFFER</Link>
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
                        />
                    ))}
                    <Button handleClick={() => setOffers([])}>clean</Button>
                </Fragment>
            )}
        </Fragment>
    );
}

export default OfferWall;
