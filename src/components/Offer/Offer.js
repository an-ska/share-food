import React from "react";
import PropTypes from "prop-types";
import "./Offer.scss";
import Button from "../Button/Button";

const Offer = ({
    id,
    title,
    description,
    soldPortions,
    availablePortions,
    portionPrice,
    authorName,
    handleDelete,
    handleAddToCart,
}) => {
    const countAvailablePortions = () => {
        if (soldPortions === 0) {
            return `${availablePortions}/${availablePortions}`
        }

        return `${availablePortions - soldPortions}/${availablePortions}`
    }

    return (
        <div className="offer" id={id}>
            <div className="offer-body">
                <h2 className="offer-title">{title}</h2>
                <p className="offer-description">{description}</p>
                <div className="offer-portion">
                    <span className="offer-portion__counter">
                        {countAvailablePortions()}
                    </span>
                    <span className="offer-portion__label"> portions available</span>
                    <p className="offer-portion__price">{portionPrice} PLN/portion</p>
                    <p className="offer-authorName">offered by {authorName}</p>
                </div>
                <Button
                    className="offer-remove-button"
                    handleClick={() => handleDelete(id)}
                >REMOVE OFFER</Button>
                <Button
                    className="offer-order-button"
                    handleClick={() => handleAddToCart(id)}
                >ORDER</Button>
            </div>
        </div>
    );
}

Offer.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    soldPortions: PropTypes.string.isRequired,
    availablePortions: PropTypes.string.isRequired,
    portionPrice: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleAddToCart: PropTypes.func.isRequired,
};

export default Offer;
