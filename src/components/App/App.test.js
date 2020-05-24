import React from 'react';
import ReactDOM from 'react-dom';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { mount, configure } from 'enzyme';

configure({ adapter: new Adapter() });

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('App', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        accessToken: null,
        expirationDate: null,
        error: null,
        loading: false,
      },
    });
  });

  const mountProvider = () =>
    mount(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(mountProvider(), div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
