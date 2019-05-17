import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';

it('renders 404 page', () => {
  const result = mount(
    <MemoryRouter initialEntries={[ '/404pagetest' ]}>
      <NotFound/>
    </MemoryRouter>
  );
  expect(result.find(Home)).toHaveLength(0);
  expect(result.find(NotFound)).toHaveLength(1);
  expect(result.find(NotFound).find('label').text()).toEqual('404');
});

it('renders home page', () => {
  const result = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <Home/>
    </MemoryRouter>
  );
  expect(result.find(Home)).toHaveLength(1);
});
