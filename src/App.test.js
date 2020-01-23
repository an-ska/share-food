import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import OfferWall from './containers/OfferWall/OfferWall';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders offer wall', () => {
    const wrapper = shallow(<App />);
    const offerWallComponent = wrapper.find(OfferWall);

    expect(offerWallComponent.exists()).toBeTruthy();
});
