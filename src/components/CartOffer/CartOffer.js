import React from 'react';
import PropTypes from 'prop-types';

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
		<div key={id}>
			<p>{title}</p>
			<p>{description}</p>
			<p>{portionPrice} zł / per portion</p>
			<p>{authorName}</p>
			{cartQuantity && <p>quantity: {cartQuantity}</p>}
			{children}
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
