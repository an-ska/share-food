import React from 'react';
import ReactDOM from 'react-dom';
import Offer from './Offer';
import Adapter from 'enzyme-adapter-react-16.1';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Offer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('title rendering', () => {
  it.each(['spaghetti', 'lasagne'])
    ('renders title from property value %s', (titleText) => {
      const wrapper = shallow(<Offer title={titleText} />)
      const titleElement = wrapper.find('.offer-title');

      expect(titleElement.text()).toEqual(titleText);
    })
});
