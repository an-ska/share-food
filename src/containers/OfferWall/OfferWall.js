import React, { useState, useEffect } from 'react';
import './OfferWall.css';
import Offer from '../../components/Offer/Offer';
import { getOffers } from '../../services/OffersService';

function OfferWall() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        setOffers(getOffers())
    }, []);

    //TODO: add key prop
    return offers.map(offer => <Offer
        title={offer.title}
        description={offer.description}
        soldPortions={offer.soldPortions}
        availablePortions={offer.availablePortions}
        portionPrice={offer.portionPrice}
        authorName={offer.authorName}
    />)
}

export default OfferWall;