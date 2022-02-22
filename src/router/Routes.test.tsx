import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import Email_Verification from '../pages/Email_Verification/Email_Verification';

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

it('render Email_Verification page', () => {
  const result = mount(
    <MemoryRouter initialEntries={['/Email_Validation_Page_Reminder_test']}>
      <EmailVerification />
    </MemoryRouter>
  );
  expect(result.find(Home)).toHaveLength(0);
  expect(result.find(Email_Verification)).toHaveLength(1);
  expect(result.find(Email_Verification).find('label').text()).toEqual('200');
});

