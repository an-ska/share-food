import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { mount, configure } from 'enzyme';
import { Provider } from 'react-redux';
import { Redirect, MemoryRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Button from '../../components/Button/Button';
import FormField from '../../components/FormField/FormField';
import Auth from './Auth';
import Loader from '../../components/Loader/Loader';

configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Auth', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        accessToken: 'xyzToken',
        expirationDate: null,
        error: null,
        loading: false,
      },
    });
  });

  const mountProvider = storeState =>
    mount(
      <Provider store={storeState}>
        <Router>
          <Auth />
        </Router>
      </Provider>
    );

  it('renders as many form fields as provided', () => {
    const wrapper = mountProvider(store);

    const formFieldComponent = wrapper.find(FormField);

    expect(formFieldComponent).toHaveLength(2);
  });

  it('passes provided offer data to FormField component', () => {
    const wrapper = mountProvider(store);

    const formFieldComponent = wrapper.find(FormField);

    expect(formFieldComponent.at(0).props().tag).toBe('input');
    expect(formFieldComponent.at(0).props().config).toEqual({
      placeholder: 'Email',
      type: 'email',
    });
    expect(formFieldComponent.at(0).props().value).toBe('');
    expect(formFieldComponent.at(0).props().invalid).toBe(true);
    expect(formFieldComponent.at(0).props().shouldValidate).toEqual({
      isEmail: true,
      required: true,
    });
    expect(formFieldComponent.at(0).props().changed).toBe(false);
  });

  it('renders only Loader component when loading is true', () => {
    store = mockStore({
      auth: {
        loading: true,
      },
    });

    const wrapper = mountProvider(store);

    const loaderComponent = wrapper.find(Loader);
    const formFieldComponent = wrapper.find(FormField);

    expect(loaderComponent).toHaveLength(1);
    expect(formFieldComponent).toHaveLength(0);
  });

  it('renders Redirect component for redirecting to offers page when user is authenticated', () => {
    const wrapper = mountProvider(store);

    const redirectComponent = wrapper.find(Redirect);

    expect(redirectComponent.props().to).toBe('/offers');
  });

  it('renders Button components', () => {
    const wrapper = mountProvider(store);

    const buttonComponent = wrapper.find(Button);

    expect(buttonComponent).toHaveLength(2);
  });

  it('first button is disabled when form is invalid', () => {
    const wrapper = mountProvider(store);

    const buttonComponent = wrapper.find(Button);

    expect(buttonComponent.at(0).props().disabled).toBe(true);
  });

  it('does not allow unauthenticated user to go to offers page', () => {
    store = mockStore({
      auth: {
        accessToken: null,
      },
    });

    const wrapper = mountProvider(store);

    const redirectComponent = wrapper.find(Redirect);

    expect(redirectComponent).toHaveLength(0);
  });
});
