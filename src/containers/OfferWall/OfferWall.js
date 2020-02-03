import React, { useState, useEffect, Fragment } from 'react'
import './OfferWall.css'
import Offer from '../../components/Offer/Offer'
import Button from '../../components/Button/Button'
import Loader from '../../components/Loader/Loader'
import Message from '../../components/Message/Message'
import { getOffers, addOffer } from '../../services/OffersService'
import { database } from '../../firebase'

const rootReference = database.ref('offers')

function OfferWall() {
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                //TODO: can we extract this? Can we make our own event like on() in the service and
                //react on it here? What should it return? Maybe it should only notify, and we can getOffers again
                //once it raises changes in the db. Or it could return updated offers too? Don't know.
                await rootReference.on('value', snapshot => {
                    let offers = [];
                    snapshot.forEach(child => {
                    const offer = {
                      ...child.val(),
                      id: child.key
                    }
                    offers.push(offer);
                  });
            
                  setOffers(offers);
                });
            } catch(error) {
                setIsError(!isError)
            }
            setIsLoading(!isLoading)
        }
        fetchData();
    }, []);

    return (
        <Fragment>
            { isError && <Message>Something went wrong...</Message>}
            { isLoading ? <Loader>LOADING LOADING LOADING...</Loader> :
                <Fragment>
                    {
                        offers.map(offer => <Offer
                        key={offer.id}
                        id={offer.id}
                        title={offer.title}
                        description={offer.description}
                        soldPortions={offer.soldPortions}
                        availablePortions={offer.availablePortions}
                        portionPrice={offer.portionPrice}
                        authorName={offer.authorName}/>)
                    }
                    <Button handleClick={addOffer}>ADD OFFER</Button>
                    <Button handleClick={() => setOffers([])}>clean</Button>
                </Fragment>
            }
        </Fragment>
    )
}

export default OfferWall;