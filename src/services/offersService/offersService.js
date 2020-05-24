export const filterOffers = (offers, id) =>
  offers.filter((offer) => offer.id !== id);

export const increaseOffer = (offers, id) =>
  offers.map((offer) =>
    offer.id === id
      ? {
          ...offer,
          soldPortions: `${parseInt(offer.soldPortions) + 1}`,
          cartQuantity: offer.cartQuantity + 1,
        }
      : offer
  );

export const decreaseOffer = (offers, id) =>
  offers.map((offer) =>
    offer.id === id
      ? {
          ...offer,
          soldPortions: `${parseInt(offer.soldPortions) - 1}`,
          cartQuantity: offer.cartQuantity - 1,
        }
      : offer
  );
