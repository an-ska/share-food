import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOffers } from "../../store/actions/offers";
import "./Profile.scss";

const Profile = () => {
    const dispatch = useDispatch();
    const fetchOffers = useCallback(() => dispatch(getOffers()), [dispatch]);
    const userId = useSelector(state => state.auth.userId);
    const offers = useSelector(state => state.offers.offers);
    const userOffers = offers.filter(offer => offer.userId === userId)

    useEffect(() => {
        fetchOffers();
    }, [fetchOffers]);

    return (
        <>
            {
                userOffers.map(offer => <div key={offer.id}>this is my offer: {offer.id}</div>)
            }
            <div>PROFILE</div>
        </>
    );
};

export default Profile;
