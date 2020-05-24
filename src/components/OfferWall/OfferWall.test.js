import React from 'react';
import OfferWall from './OfferWall';
import Offer from '../../components/Offer/Offer';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import { Link, MemoryRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('OfferWall', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			offers: {
				offers: [
					{
						id: '-Lz7RvUjUW4iVuIyWUNS',
						title: 'spaghetti',
						description: 'pasta with tomato sauce',
						soldPortions: 1,
						availablePortions: 3,
						portionPrice: 9,
						authorName: 'Kuba',
					},
					{
						id: '-Lz7TDn7itWKSgLMvG24',
						title: 'lasagne',
						description: 'flat pasta with meat',
						soldPortions: 2,
						availablePortions: 4,
						portionPrice: 12,
						authorName: 'Ania',
					},
				],
			},
		});
	});

	const mountProvider = storeState =>
		mount(
			<Provider store={storeState}>
				<Router>
					<OfferWall />
				</Router>
			</Provider>
		);

	it('renders as many offers as provided', () => {
		const wrapper = mountProvider(store);

		const offerComponent = wrapper.find(Offer);

		expect(offerComponent).toHaveLength(2);
	});

	it('passes provided offer data to Offer component', () => {
		store = mockStore({
			offers: {
				offers: [
					{
						id: '-Lz7RvUjUW4iVuIyWUNS',
						title: 'spaghetti',
						description: 'pasta with tomato sauce',
						soldPortions: 1,
						availablePortions: 3,
						portionPrice: 9,
						authorName: 'Kuba',
					},
				],
			},
		});

		const wrapper = mountProvider(store);

		const offerComponent = wrapper.find(Offer);

		expect(offerComponent.props().id).toBe('-Lz7RvUjUW4iVuIyWUNS');
		expect(offerComponent.props().title).toBe('spaghetti');
		expect(offerComponent.props().description).toBe('pasta with tomato sauce');
		expect(offerComponent.props().soldPortions).toBe(1);
		expect(offerComponent.props().availablePortions).toBe(3);
		expect(offerComponent.props().portionPrice).toBe(9);
		expect(offerComponent.props().authorName).toBe('Kuba');
	});

	it('renders only Message component in case of error', () => {
		store = mockStore({
			offers: {
				error: 401,
			},
		});

		const wrapper = mountProvider(store);

		const messageComponent = wrapper.find(Message);
		const loaderComponent = wrapper.find(Loader);
		const offerComponent = wrapper.find(Offer);

		expect(messageComponent).toHaveLength(1);
		expect(loaderComponent).toHaveLength(0);
		expect(offerComponent).toHaveLength(0);
	});

	it('renders only Loader component when loading is true', () => {
		store = mockStore({
			offers: {
				loading: true,
			},
		});

		const wrapper = mountProvider(store);

		const loaderComponent = wrapper.find(Loader);
		const messageComponent = wrapper.find(Message);
		const offerComponent = wrapper.find(Offer);

		expect(loaderComponent).toHaveLength(1);
		expect(messageComponent).toHaveLength(0);
		expect(offerComponent).toHaveLength(0);
	});

	it('renders Link component for redirecting to add offer page', () => {
		const wrapper = mountProvider(store);

		const linkComponent = wrapper.find(Link);

		expect(linkComponent.props().to).toBe('/add-offer');
	});
});
