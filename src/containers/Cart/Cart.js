import React, { useEffect, useCallback, useState } from "react";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { postOrder } from "../../store/actions/offers";
import {
    setCartOffers,
    increaseCartOffer,
    decreaseCartOffer,
    removeCartOffer,
    setImpossibleOrderMessage,
} from "../../store/actions/offers";
import axios from "axios";
import { database as url } from "../../endpoints";
const getAccessToken = () => `?auth=${localStorage.getItem("accessToken")}`;

const Cart = () => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(null);
    const userId = useSelector((state) => state.auth.userId);
    const onSetCartOffers = (offers) => dispatch(setCartOffers(offers));
    const onIncreaseCartOffer = (id) => dispatch(increaseCartOffer(id));
    const onDecreaseCartOffer = (id) => dispatch(decreaseCartOffer(id));
    const onRemoveCartOffer = (id) => dispatch(removeCartOffer(id));
    const onImpossibleOrder = (state) => dispatch(setImpossibleOrderMessage(state))
    const offers = useSelector((state) => state.offers);
    const cartOffers = useSelector((state) => state.offers.cartOffers);
    const onOrder = (order) => dispatch(postOrder(order));

    const handleQuantityIncrease = (id) => {
        const offer = offers.offers.find((offer) => offer.id === id);
        offer.soldPortions = `${parseInt(offer.soldPortions) + 1}`;

        onIncreaseCartOffer(id)
    };

    const handleQuantityDecrease = (id) => {
        const offer = offers.offers.find((offer) => offer.id === id);
        offer.soldPortions = `${parseInt(offer.soldPortions) - 1}`;

        const updatedCartOffer = cartOffers.find((offer) => offer.id === id);

        onDecreaseCartOffer(id);

        if (updatedCartOffer.cartQuantity === 1) {
            onRemoveCartOffer(id);

            return;
        }
    };

    const handleRemoveFromCart = (id) => {
        const offer = offers.offers.find((offer) => offer.id === id);
        offer.soldPortions = `${parseInt(offer.soldPortions) - offer.cartQuantity}`;
        offer.cartQuantity = 0;

        onRemoveCartOffer(id)
    };

    const handleOrder = async () => {
        const order = cartOffers.map((offer) => {
            return {
                orderId: offer.id,
                title: offer.title,
                boughtBy: [...offer.boughtBy, userId],
                soldPortions: offer.soldPortions,
            };
        });

        const verifiedOrder = cartOffers.map(async (offer) => {
            try {
                const response = await axios.get(
                    `${url}/offers/${offer.id}.json${getAccessToken()}`
                );

                return (
                    offer.cartQuantity + parseInt(response.data.soldPortions) >
          parseInt(response.data.availablePortions)
                );
            } catch (error) {
                onImpossibleOrder(true);
            }
        });

        const impossibleOrder = await Promise.all(verifiedOrder);

        if (impossibleOrder.includes(true)) {
            onImpossibleOrder(true);

            return;
        }

        onOrder(order);

        onSetCartOffers([]);
    };

    const orderTotalPrice = useCallback(() => {
        const totalOrderPrice = cartOffers.reduce(function (accumulator, offer) {
            return accumulator + parseInt(offer.portionPrice) * offer.cartQuantity;
        }, 0);
        setTotalPrice(totalOrderPrice);
    }, [cartOffers]);

    useEffect(() => {
        orderTotalPrice();
    }, [cartOffers, orderTotalPrice]);

    return (
        <aside>
            {cartOffers.map((offer) => (
                <div key={offer.id}>
                    <p>{offer.title}</p>
                    <p>{offer.description}</p>
                    <p>{offer.portionPrice} zł / per portion</p>
                    <p>{offer.authorName}</p>
                    {offer.cartQuantity && <p>quantity: {offer.cartQuantity}</p>}
                    <Button
                        handleClick={() => handleQuantityIncrease(offer.id)}
                        disabled={offer.soldPortions === offer.availablePortions}
                    >
                        <FontAwesomeIcon icon="plus" />
                    </Button>
                    <Button handleClick={() => handleQuantityDecrease(offer.id)}>
                        <FontAwesomeIcon icon="minus" />
                    </Button>
                    <Button handleClick={() => handleRemoveFromCart(offer.id)}>
                        <FontAwesomeIcon icon="trash" />
                    </Button>
                </div>
            ))}
            <Button handleClick={handleOrder}>
        ORDER {totalPrice > 0 && `${totalPrice} zł`}
            </Button>
        </aside>
    );
}


export default Cart;