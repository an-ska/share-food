import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './ShareFood.module.scss';
import OfferWall from '../../components/OfferWall/OfferWall';
import Message from '../../components/Message/Message';
import Cart from '../../components/Cart/Cart';

const ShareFood = () => {
  const isError = useSelector(state => state.offers.error);
  const orderErrors = useSelector(state => state.offers.orderErrors);
  const impossibleOrderMessage = useSelector(
    state => state.offers.impossibleOrderMessage
  );

  useEffect(() => {
    document.body.className = 'body-primary';
  }, []);

  const renderContent = () => {
    if (isError) {
      return <Message>Something went wrong. Try again later.</Message>;
    }

    if (orderErrors.length) {
      return (
        <Message>
          Try again later. The following offers cannot be ordered now:
          <ul>
            {orderErrors.map(offer => (
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
      <section className={styles['sharefood']}>
        <Link to='/add-offer' className={styles['sharefood__link']}>
          <FontAwesomeIcon icon='plus-circle' />
          ADD OFFER
        </Link>
        <article className={styles['sharefood-container']}>
          <OfferWall />
          <Cart />
        </article>
      </section>
    );
  };

  return renderContent();
};

export default ShareFood;
