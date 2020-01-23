import { database } from '../firebase'

export const getOffers = async () => {
    const rootRef = database.ref().child('offers');
    let offers = [];

    await rootRef.once('value').then(snapshot => {
        snapshot.forEach(child => {
            const offer = {
                ...child.val(),
                id: child.key
            }
            offers.push(offer);
        });
    });

    return offers;
}