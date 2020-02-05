import React from 'react';
import Offer from '../../components/Offer/Offer';
import OfferWall from './OfferWall';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { getOffers } from '../../services/OffersService';
import { act } from 'react-dom/test-utils';

jest.mock('../../services/OffersService');
configure({ adapter: new Adapter() });

const wait = (amount = 0) => {
    return new Promise(resolve => setTimeout(resolve, amount));
}

const updateWrapper = async (wrapper, amount = 0) => {
    await act(async () => {
        await wait(amount);
        wrapper.update();
    });
}

it('renders as many offers as provided', async () => {
    getOffers.mockImplementation((setOffers) => setOffers([
        {
            id: "-Lz7RvUjUW4iVuIyWUNS",
            title: "spaghetti",
            description: "pasta with tomato sauce",
            soldPortions: 1,
            availablePortions: 3,
            portionPrice: 9,
            authorName: "Kuba",
        },
        {
            id: "-Lz7TDn7itWKSgLMvG24",
            title: "lasagne",
            description: "flat pasta with meat",
            soldPortions: 2,
            availablePortions: 4,
            portionPrice: 12,
            authorName: "Ania",
        }
    ]));

    const wrapper = mount(<OfferWall />);
    await updateWrapper(wrapper);

    const offerComponent = wrapper.find(Offer);

    expect(offerComponent).toHaveLength(2);
});

it('passes provided offer data to Offer component', async () => {
    getOffers.mockImplementation((setOffers) => setOffers([
        {
            id: "-Lz7RvUjUW4iVuIyWUNS",
            title: "spaghetti",
            description: "pasta with tomato sauce",
            soldPortions: 1,
            availablePortions: 3,
            portionPrice: 9,
            authorName: "Kuba",
        }
    ]));

    const wrapper = mount(<OfferWall />);
    await updateWrapper(wrapper);

    const offerComponent = wrapper.find(Offer);

    expect(offerComponent.props().id).toBe("-Lz7RvUjUW4iVuIyWUNS");
    expect(offerComponent.props().title).toBe("spaghetti");
    expect(offerComponent.props().description).toBe("pasta with tomato sauce");
    expect(offerComponent.props().soldPortions).toBe(1);
    expect(offerComponent.props().availablePortions).toBe(3);
    expect(offerComponent.props().portionPrice).toBe(9);
    expect(offerComponent.props().authorName).toBe("Kuba");
});