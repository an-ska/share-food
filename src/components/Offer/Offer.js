import React from 'react';
import PropTypes from 'prop-types';
import styles from './Offer.module.scss';
import Cooking from '../SVG/Cooking';
import Cook from '../SVG/Cook';
import Money from '../SVG/Money';
import Quantity from '../SVG/Quantity';

const Offer = ({
  id,
  title,
  description,
  soldPortions,
  availablePortions,
  portionPrice,
  authorName,
  children,
}) => {
  const countAvailablePortions = () => {
    if (soldPortions === 0) {
      return `${availablePortions}/${availablePortions}`;
    }

    return `${availablePortions - soldPortions}/${availablePortions}`;
  };

  return (
    <div className={styles['offer']} id={id}>
      <div className={styles['offer-header']}>
        <Cooking />
      </div>
      <div className={styles['offer-body']}>
        <h2 className={styles['offer-title']}>{title}</h2>
        <p className={styles['offer-description']}>{description}</p>
        <div className={styles['offer-details']}>
          <div className={styles['offer-details__item']}>
            <Quantity />
            {countAvailablePortions()} portions available
          </div>
          <div className={styles['offer-details__item']}>
            <Money /> {portionPrice} PLN/portion
          </div>
          <div className={styles['offer-details__item']}>
            <Cook /> offered by {authorName}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

Offer.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  soldPortions: PropTypes.string.isRequired,
  availablePortions: PropTypes.string.isRequired,
  portionPrice: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  children: PropTypes.object,
};

export default Offer;
