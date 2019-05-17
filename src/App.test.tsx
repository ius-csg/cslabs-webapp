import * as React from 'react';
import App from './App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
    const result = shallow(<App />);
    expect(result.find(App)).toBeDefined();
});
