import { database } from '../firebase'

const rootReference = database.ref('offers')

export const getOffers = async () => {

  await rootReference.on('value', snapshot => {
    let offers = [];
    snapshot.forEach(child => {
      const offer = {
        ...child.val(),
        id: child.key
      }
      offers.push(offer);
    });

    return offers;
  });

}

export const addOffer = () => {
  const offer = {
    authorName: "Basia",
    availablePortions: 10,
    description: "pizza",
    portionPrice: 8,
    soldPortions: 2,
    title: "Vegetarian pizza"
  }

  rootReference.push(offer)
}

export const removeOffer = (id) => {
  return rootReference.child(id).remove()
}
