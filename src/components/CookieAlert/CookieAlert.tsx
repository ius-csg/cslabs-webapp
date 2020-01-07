import React from 'react';
import {Alert, Button} from 'react-bootstrap';
import {RoutePaths} from '../../router/RoutePaths';
import styles from './CookieAlert.module.scss';

const acceptPolicy = () => localStorage.setItem('accepted_cookie_policy', 'true' );

export const CookieAlert = (props: {}) => {

  if (localStorage.getItem('accepted_cookie_policy')) {
    return null;
  }

  return (
    <Alert variant='primary' style={styles['cookieloc']}>
      Please accept the cookie policy.
      <Alert.Link href={RoutePaths.sitePolicy}>Cookie Policy</Alert.Link>
      We use cookies to give you a better experience and to allow you to connect to the virtual machines.
      <Button variant='secondary' onClick={() => acceptPolicy()} >Accept</Button>
      this.forceUpdate();
    </Alert>
  );
};
