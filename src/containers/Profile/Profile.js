import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../store/actions/offers";
import Offer from '../../components/Offer/Offer';
import { deleteOffer } from "../../store/actions/offers";
import Button from "../../components/Button/Button";
import "./Profile.scss";

const Profile = () => {
    const dispatch = useDispatch();
    const fetchOffers = useCallback(() => dispatch(getOffers()), [dispatch]);
    const userId = useSelector(state => state.auth.userId);
    const offers = useSelector(state => state.offers.offers);
    const userOffers = offers.filter(offer => offer.addedBy === userId)
    const boughtOffers = offers.filter(offer => offer.boughtBy.includes(userId))
    const onDeleteOffer = id => dispatch(deleteOffer(id));

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    return (
        <>
            <p>OFFERS YOU ADDED</p>
            {userOffers.map((offer) => (
                <Offer
                    id={offer.id}
                    key={offer.id}
                    title={offer.title}
                    description={offer.description}
                    soldPortions={offer.soldPortions}
                    availablePortions={offer.availablePortions}
                    portionPrice={offer.portionPrice}
                    authorName={offer.authorName}
                >
                    <Button
                        className="offer-remove-button"
                        handleClick={() => onDeleteOffer(offer.id)}
                    >
              REMOVE OFFER
                    </Button>
                </Offer>
            ))}
            <p>OFFERS YOU BOUGHT</p>
            {boughtOffers.map((offer) => (
                <Offer
                    id={offer.id}
                    key={offer.id}
                    title={offer.title}
                    description={offer.description}
                    soldPortions={offer.soldPortions}
                    availablePortions={offer.availablePortions}
                    portionPrice={offer.portionPrice}
                    authorName={offer.authorName}
                >
                </Offer>
            ))}
            <div>PROFILE</div>
        </>
    );
};

export default Profile;
