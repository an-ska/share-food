import { database } from '../firebase'

export const getOffers = async () => {
    const rootRef = database.ref().child('offers');

    let offers = [];
    await rootRef.once('value').then(function(snapshot) {
      offers = snapshot.val()
    });

    return offers;
}