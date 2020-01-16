import * as firebase from 'firebase'

export const getOffers = async () => {
    const rootRef = firebase.database().ref().child('offers');

    let offers = [];
    await rootRef.once('value').then(function(snapshot) {
      offers = snapshot.val()
    });

    return offers;
}