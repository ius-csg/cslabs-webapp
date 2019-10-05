import {Redirect, RouteComponentProps} from 'react-router';
import React from 'react';
import {logout} from '../../api';

export function LogOut(props: RouteComponentProps) {
  logout();
  return (
    <Redirect
      to={{
        pathname: '/',
        state: { from: props.location }
      }}
    />
  );
}
