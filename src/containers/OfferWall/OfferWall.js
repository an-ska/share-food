import React, { useState, useEffect, Fragment } from 'react';
import './OfferWall.css';
import Offer from '../../components/Offer/Offer';
import Button from '../../components/Button/Button'
import { getOffers, addOffer } from '../../services/OffersService';

function OfferWall() {
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setOffers(await getOffers())
        }
        fetchData();
    }, []);

    return (
        <Fragment>
            {
                offers.map(offer => <Offer
                key={offer.id}
                id={offer.id}
                title={offer.title}
                description={offer.description}
                soldPortions={offer.soldPortions}
                availablePortions={offer.availablePortions}
                portionPrice={offer.portionPrice}
                authorName={offer.authorName}/>)
            }
            <Button handleClick={addOffer}>ADD OFFER</Button>
        </Fragment>
    )
}

export default OfferWall;