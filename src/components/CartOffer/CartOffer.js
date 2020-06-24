import React from 'react';
import PropTypes from 'prop-types';
import styles from './CartOffer.module.scss';

const CartOffer = ({
  id,
  title,
  description,
  portionPrice,
  authorName,
  cartQuantity,
  children,
}) => {
  return (
    <div key={id} className={styles['cart-offer']}>
      <strong className={styles['cart-offer__title']}>
        {cartQuantity && `${cartQuantity}`}x <span>{title}</span>
      </strong>
      <p>{description}</p>
      <strong>{portionPrice} zł / per portion</strong>
      <p>{authorName}</p>
      <div className={styles['cart-offer__actions']}>{children}</div>
    </div>
  );
};

CartOffer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  soldPortions: PropTypes.string.isRequired,
  portionPrice: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  cartQuantity: PropTypes.number.isRequired,
  children: PropTypes.array,
};

export default CartOffer;
