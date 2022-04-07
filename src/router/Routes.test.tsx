import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound/NotFound';
import EmailVerification from '../pages/EmailVerification/EmailVerification';

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

it('render EmailVerification page', () => {
  const result = mount(
    <MemoryRouter initialEntries={['/Email_Validation_Page_Reminder_test']}>
      <EmailVerification />
    </MemoryRouter>
  );
  expect(result.find(Home)).toHaveLength(0);
  expect(result.find(EmailVerification)).toHaveLength(1);
  expect(result.find(EmailVerification).find('label').text()).toEqual('200');
});

