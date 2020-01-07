import React from 'react';
import {Alert, Button} from 'react-bootstrap';
import {RoutePaths} from '../../router/RoutePaths';

// const acceptPolicy = () => localStorage.setItem()

export const CookieAlert = (props: {}) => {
  if (localStorage.getItem('accepted_cookie_policy')) {
    return null;
  }

  return (
    <Alert variant='primary' style={{position: 'absolute', bottom: 0}}>
      Please accept the cookie policy.
      <Alert.Link href={RoutePaths.sitePolicy}>Cookie Policy</Alert.Link>
      We use cookies to give you a better experience and to allow you to connect to the virtual machines.
    {/* @todo use accept button (use localstorage.set*/}
      <Button variant="dark">Dark</Button>
    {/* @todo trigger rerender*/}
    </Alert>
  );
};
