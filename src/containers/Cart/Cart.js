import React, { useEffect, useCallback, useState } from "react";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../../store/actions/offers";
import CartOffer from "../../components/CartOffer/CartOffer";
import {
    clearCartOffers,
    increaseCartOffer,
    decreaseCartOffer,
    removeCartOffer,
    setImpossibleOrderMessage,
} from "../../store/actions/offers";
import axios from "axios";
import { database as url } from "../../endpoints";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const getAccessToken = () => `?auth=${localStorage.getItem("accessToken")}`;

const Cart = () => {
    const dispatch = useDispatch();
    const [totalPrice, setTotalPrice] = useState(null);
    const userId = useSelector((state) => state.auth.userId);
    const onClearCartOffers = () => dispatch(clearCartOffers());
    const onIncreaseCartOffer = (id) => dispatch(increaseCartOffer(id));
    const onDecreaseCartOffer = (id) => dispatch(decreaseCartOffer(id));
    const onRemoveCartOffer = (id) => dispatch(removeCartOffer(id));
    const onImpossibleOrder = (state) => dispatch(setImpossibleOrderMessage(state))
    const cartOffers = useSelector((state) => state.offers.cartOffers);
    const onOrder = (order) => dispatch(postOrder(order));

    const findOfferInArray = (id, array) => array.find((offer) => offer.id === id);

    const handleQuantityIncrease = (id) => {
        onIncreaseCartOffer(id);
    };

    const handleQuantityDecrease = (id) => {
        onDecreaseCartOffer(id);

        const updatedCartOffer = findOfferInArray(id, cartOffers);

        if (updatedCartOffer.cartQuantity === 1) {
            onRemoveCartOffer(id);

            return;
        }
    };

    const handleRemoveFromCart = (id) => {
        onRemoveCartOffer(id)
    };

    const isOrderPossible = () =>
        cartOffers.map(async (offer) => {
            try {
                const response = await axios.get(
                    `${url}/offers/${offer.id}.json${getAccessToken()}`
                );

                return (
                    offer.cartQuantity + parseInt(response.data.soldPortions) <=
                    parseInt(response.data.availablePortions)
                );
            } catch (error) {
                return false;
            }
        });

    const handleOrder = async () => {
        const order = cartOffers.map((offer) => {
            return {
                orderId: offer.id,
                title: offer.title,
                boughtBy: [...offer.boughtBy, userId],
                soldPortions: offer.soldPortions,
            };
        });

        const possibleOrder = await Promise.all(isOrderPossible());

        if (possibleOrder.includes(false)) {
            onImpossibleOrder(true);

            return;
        }

        onOrder(order);

        onClearCartOffers();
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
                <CartOffer
                    key={offer.id}
                    id={offer.id}
                    title={offer.title}
                    description={offer.description}
                    authorName={offer.authorName}
                    portionPrice={offer.portionPrice}
                    soldPortions={offer.soldPortions}
                    cartQuantity={offer.cartQuantity}
                >
                    <Button handleClick={() => handleQuantityIncrease(offer.id)}
                        disabled={offer.soldPortions === offer.availablePortions}>
                        {console.log(offer.soldPortions, offer.availablePortions)}
                        <FontAwesomeIcon icon="plus" />
                    </Button>
                    <Button handleClick={() => handleQuantityDecrease(offer.id)}>
                        <FontAwesomeIcon icon="minus" />
                    </Button>
                    <Button handleClick={() => handleRemoveFromCart(offer.id)}>
                        <FontAwesomeIcon icon="trash" />
                    </Button>
                </CartOffer>
            ))}
            <Button handleClick={handleOrder}>
                ORDER {totalPrice > 0 && `${totalPrice} zł`}
            </Button>
        </aside>
    );
}

export default Cart;
