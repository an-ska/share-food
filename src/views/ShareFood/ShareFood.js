import React from "react";
import { Link } from "react-router-dom";
import "./ShareFood.scss";
import OfferWall from "../../components/OfferWall/OfferWall";
import Message from "../../components/Message/Message";
import { useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";

const ShareFood = () => {
    const isError = useSelector((state) => state.offers.error);
    const orderErrors = useSelector((state) => state.offers.orderErrors);
    const impossibleOrderMessage = useSelector(
        (state) => state.offers.impossibleOrderMessage
    );

    const renderContent = () => {
        if (isError) {
            return <Message>Something went wrong. Try again later.</Message>;
        }

        if (orderErrors.length) {
            return (
                <Message>
                    Try again later. The following offers cannot be ordered now:
                    <ul>
                        {orderErrors.map((offer) => (
                            <li key={offer}>{offer}</li>
                        ))}
                    </ul>
                </Message>
            );
        }

        if (impossibleOrderMessage) {
            return (
                <Message>Your order cannot be processed. Try again later.</Message>
            );
        }

        return (
            <>
                <Link to="/add-offer">ADD OFFER</Link>
                <OfferWall />
                <Cart />
            </>
        );
    };

    return renderContent();
};

export default ShareFood;
