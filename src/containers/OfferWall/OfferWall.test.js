import React from 'react';
import Offer from '../../components/Offer/Offer';
import OfferWall from './OfferWall';
import Adapter from 'enzyme-adapter-react-16.1';
import { shallow, configure } from 'enzyme';
import { getOffers } from '../../services/OffersService';

jest.mock('../../services/OffersService');
configure({ adapter: new Adapter() });

it('renders as many offers as provided', () => {
    getOffers.mockReturnValueOnce([
        {
            title: "spaghetti",
            description: "pasta with tomato sauce",
            soldPortions: 1,
            availablePortions: 3,
            portionPrice: 9,
            authorName: "Kuba",
        },
        {
            title: "lasagne",
            description: "flat pasta with meat",
            soldPortions: 2,
            availablePortions: 4,
            portionPrice: 12,
            authorName: "Ania",
        }
    ]);

    const wrapper = shallow(<OfferWall />);
    const offerComponent = wrapper.find(Offer);

    expect(offerComponent).toHaveLength(2);
});

it('passes provided offer data to Offer component', () => {
    getOffers.mockReturnValueOnce([
        {
            title: "spaghetti",
            description: "pasta with tomato sauce",
            soldPortions: 1,
            availablePortions: 3,
            portionPrice: 9,
            authorName: "Kuba",
        }
    ]);
    
    const wrapper = shallow(<OfferWall />);
    const offerComponent = wrapper.find(Offer);

    expect(offerComponent.props().title).toBe("spaghetti");
    expect(offerComponent.props().description).toBe("pasta with tomato sauce");
    expect(offerComponent.props().soldPortions).toBe(1);
    expect(offerComponent.props().availablePortions).toBe(3);
    expect(offerComponent.props().portionPrice).toBe(9);
    expect(offerComponent.props().authorName).toBe("Kuba");    
});