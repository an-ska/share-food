import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, configure } from 'enzyme';
import OfferWall from './containers/OfferWall/OfferWall';
import { act } from 'react-dom/test-utils';


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

it('renders without crashing', async () => {
    const div = document.createElement('div');
    const wrapper = mount(<App />, div);
    await updateWrapper(wrapper);

    ReactDOM.unmountComponentAtNode(div);
});

it('renders offer wall', async () => {
    const wrapper = shallow(<App />);
    const offerWallComponent = wrapper.find(OfferWall);
    await updateWrapper(wrapper);

    expect(offerWallComponent.exists()).toBeTruthy();
});
