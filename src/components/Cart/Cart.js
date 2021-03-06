import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../Button/Button';
import { postOrder } from '../../store/actions/offers';
import CartOffer from '../CartOffer/CartOffer';
import Plate from '../SVG/Plate';
import Heading from '../Heading/Heading';
import styles from './Cart.module.scss';
import {
  clearCartOffers,
  increaseCartOffer,
  decreaseCartOffer,
  removeCartOffer,
  setImpossibleOrderMessage,
} from '../../store/actions/offers';
import { database as url } from '../../endpoints';
const getAccessToken = () => `?auth=${localStorage.getItem('accessToken')}`;

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(null);
  const dispatch = useDispatch();
  const onClearCartOffers = () => dispatch(clearCartOffers());
  const onIncreaseCartOffer = id => dispatch(increaseCartOffer(id));
  const onDecreaseCartOffer = id => dispatch(decreaseCartOffer(id));
  const onRemoveCartOffer = id => dispatch(removeCartOffer(id));
  const onImpossibleOrder = state => dispatch(setImpossibleOrderMessage(state));
  const onOrder = order => dispatch(postOrder(order));
  const cartOffers = useSelector(state => state.offers.cartOffers);
  const userId = useSelector(state => state.auth.userId);

  const handleQuantityIncrease = id => {
    onIncreaseCartOffer(id);
  };

  const handleQuantityDecrease = id => {
    onDecreaseCartOffer(id);

    const updatedCartOffer = cartOffers.find(offer => offer.id === id);

    if (updatedCartOffer.cartQuantity === 1) {
      onRemoveCartOffer(id);

      return;
    }
  };

  const handleRemoveFromCart = id => {
    onRemoveCartOffer(id);
  };

  const isOrderPossible = () =>
    cartOffers.map(async offer => {
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
    const order = cartOffers.map(offer => ({
      orderId: offer.id,
      boughtBy: [...offer.boughtBy, userId],
      soldPortions: offer.soldPortions,
    }));

    const possibleOrder = await Promise.all(isOrderPossible());

    if (possibleOrder.includes(false)) {
      onImpossibleOrder(true);

      return;
    }

    onOrder(order);

    onClearCartOffers();
  };

  const orderTotalPrice = useCallback(() => {
    const totalOrderPrice = cartOffers.reduce((accumulator, offer) => {
      return accumulator + parseInt(offer.portionPrice) * offer.cartQuantity;
    }, 0);

    setTotalPrice(totalOrderPrice);
  }, [cartOffers]);

  useEffect(() => {
    orderTotalPrice();
  }, [cartOffers, orderTotalPrice]);

  const renderContent = () => {
    if (cartOffers.length) {
      return (
        <>
          {cartOffers.map(offer => (
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
              <Button
                handleClick={() => handleQuantityIncrease(offer.id)}
                disabled={offer.soldPortions === offer.availablePortions}
              >
                <FontAwesomeIcon icon='plus' />
              </Button>
              <Button handleClick={() => handleQuantityDecrease(offer.id)}>
                <FontAwesomeIcon icon='minus' />
              </Button>
              <Button handleClick={() => handleRemoveFromCart(offer.id)}>
                <FontAwesomeIcon icon='trash' />
              </Button>
            </CartOffer>
          ))}
        </>
      );
    } else {
      return (
        <span className={styles['cart__empty']}>
          <Plate />
        </span>
      );
    }
  };

  return (
    <aside className={styles['cart']}>
      <Heading>
        <h2>CART</h2>
      </Heading>
      {renderContent()}
      <div
        className={styles['cart__order-button']}
        disabled={cartOffers.length === 0}
      >
        <Button handleClick={handleOrder} disabled={cartOffers.length === 0}>
          ORDER {totalPrice > 0 && `${totalPrice} zł`}
        </Button>
      </div>
    </aside>
  );
};

export default Cart;
