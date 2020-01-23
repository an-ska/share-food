import React from 'react';
import './Offer.css';

const Offer = ({
    id,
    title,
    description,
    soldPortions,
    availablePortions,
    portionPrice,
    authorName
}) => (
        <div className="offer" id={id}>
            <div className="offer-body">
                <h2 className="offer-title">{title}</h2>
                <p className="offer-description">{description}</p>
                <div className="offer-portion">
                    <span className="offer-portion__counter">{soldPortions}/{availablePortions}</span>
                    <span className="offer-portion__label">portions available</span>
                    <p className="offer-portion__price">{portionPrice} PLN/portion</p>
                    <p className="offer-authorName">offered by {authorName}</p>
                </div>
            </div>
        </div>
    );

export default Offer;