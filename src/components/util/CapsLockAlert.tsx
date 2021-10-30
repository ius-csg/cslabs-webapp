import {Alert} from 'react-bootstrap';
import * as React from 'react';
import {CapsLockContext} from '../CapsLockContext/CapsLockContext';

export function CapsLockAlert() {
  const capsLockState = React.useContext(CapsLockContext);
  return <Alert show={capsLockState.capsLock} variant='warning'>Your caps lock is on!</Alert>;
}
