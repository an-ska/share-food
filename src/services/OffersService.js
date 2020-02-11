import { database } from '../firebase'

const rootReference = database.ref('offers')

export const getOffers = async (setOffers) => {
    await rootReference.on('value', snapshot => {
        let offers = [];
        snapshot.forEach(child => {
            const offer = {
                ...child.val(),
                id: child.key
            }
            offers.push(offer);
        });
        setOffers(offers)
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


    //TODO:use promise to handle errors and show confirmation of adding
    rootReference.push(offer)
}

export const removeOffer = (id) => {
    //TODO:use promise to handle errors and show confirmation of removal
    return rootReference.child(id).remove()
}
