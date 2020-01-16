import React, { useState, useEffect } from 'react';
import './OfferWall.css';
import Offer from '../../components/Offer/Offer';
import { getOffers } from '../../services/OffersService';

function OfferWall() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setOffers(await getOffers())
        }
        fetchData();
    }, []);

    //TODO: key is not unique. Change it.
    return offers.map(offer => <Offer
        key={offer.title}
        title={offer.title}
        description={offer.description}
        soldPortions={offer.soldPortions}
        availablePortions={offer.availablePortions}
        portionPrice={offer.portionPrice}
        authorName={offer.authorName}
    />)
}

export default OfferWall;