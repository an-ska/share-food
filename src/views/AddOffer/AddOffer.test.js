import React from 'react';
import AddOffer from './AddOffer';
import FormField from '../../components/FormField/FormField';
import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import { Redirect, MemoryRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('AddOffer', () => {
	let store;

	beforeEach(() => {
		store = mockStore({
			offers: {
				loading: false,
				redirectPath: '/offers',
			},
		});
	});

	const mountProvider = storeState =>
		mount(
			<Provider store={storeState}>
				<Router>
					<AddOffer />
				</Router>
			</Provider>
		);

	/** TODO: test if right number of form fields is rendered
        it("renders as many form fields as provided", () => {
        });
    */

	it('passes provided offer data to FormField component', () => {
		const wrapper = mountProvider(store);

		const formFieldComponent = wrapper.find(FormField);

		expect(formFieldComponent.at(0).props().tag).toBe('input');
		expect(formFieldComponent.at(0).props().config).toEqual({
			type: 'text',
			placeholder: 'Title...',
		});
		expect(formFieldComponent.at(0).props().value).toBe('');
		expect(formFieldComponent.at(0).props().invalid).toBe(true);
		expect(formFieldComponent.at(0).props().shouldValidate).toEqual({
			required: true,
		});
		expect(formFieldComponent.at(0).props().changed).toBe(false);
	});

	it('renders Message component in case of error', () => {
		store = mockStore({
			offers: {
				error: 401,
			},
		});

		const wrapper = mountProvider(store);

		const messageComponent = wrapper.find(Message);
		const loaderComponent = wrapper.find(Loader);

		expect(messageComponent).toHaveLength(1);
		expect(loaderComponent).toHaveLength(0);
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
		const formFieldComponent = wrapper.find(FormField);

		expect(loaderComponent).toHaveLength(1);
		expect(messageComponent).toHaveLength(0);
		expect(formFieldComponent).toHaveLength(0);
	});

	it('renders Redirect component for redirecting to add offer page', () => {
		const wrapper = mountProvider(store);

		const redirectComponent = wrapper.find(Redirect);

		expect(redirectComponent.props().to).toBe('/offers');
	});
});
