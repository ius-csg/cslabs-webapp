import React from 'react';
import {Alert, Button} from 'react-bootstrap';
import {RoutePaths} from '../../router/RoutePaths';
import styles from './CookieAlert.module.scss';
import {useForceUpdate} from '../util/Util';

export const CookieAlert = () => {

  const forceUpdate = useForceUpdate();

  const acceptPolicy = () => {
    localStorage.setItem('accepted_cookie_policy', 'true' );
    forceUpdate();
  };
  if (localStorage.getItem('accepted_cookie_policy')) {
    return null;
  }

  return (
    <Alert variant='primary' className={styles['cookie-alert']}>
      <div>
      Please accept the cookie policy. &nbsp;
      <Alert.Link href={RoutePaths.sitePolicy}>Cookie Policy</Alert.Link> &nbsp;
      We use cookies to give you a better experience and to allow you to connect to the virtual machines.
      </div>
      <Button className={styles['accept-btn']} variant='secondary' onClick={() => acceptPolicy()} >Accept</Button>
    </Alert>
  );
};
