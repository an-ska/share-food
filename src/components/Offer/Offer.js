import React from "react";
import PropTypes from "prop-types";
import "./Offer.css";
import Button from "../Button/Button";
import { deleteOffer } from "../../store/actions/offers";
import { useDispatch } from "react-redux";

const Offer = ({
    id,
    title,
    description,
    soldPortions,
    availablePortions,
    portionPrice,
    authorName
}) => {
    const dispatch = useDispatch();
    const onDeleteOffer = id => dispatch(deleteOffer(id));

    return (
        <div className="offer" id={id}>
            <div className="offer-body">
                <h2 className="offer-title">{title}</h2>
                <p className="offer-description">{description}</p>
                <div className="offer-portion">
                    <span className="offer-portion__counter">
                        {soldPortions}/{availablePortions}
                    </span>
                    <span className="offer-portion__label"> portions available</span>
                    <p className="offer-portion__price">{portionPrice} PLN/portion</p>
                    <p className="offer-authorName">offered by {authorName}</p>
                </div>
                <Button
                    className="offer-remove-button"
                    handleClick={() => onDeleteOffer(id)}
                >
            REMOVE OFFER
                </Button>
            </div>
        </div>
    )
}

Offer.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    soldPortions: PropTypes.string.isRequired,
    availablePortions: PropTypes.string.isRequired,
    portionPrice: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired
};

export default Offer;
