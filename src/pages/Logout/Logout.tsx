import {Redirect, RouteComponentProps} from 'react-router';
import React from 'react';
import {logout} from '../../api';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

type LogoutProps = ReturnType<typeof mapDispatchToProps> & RouteComponentProps & {
  label: string;
};

export function LogOutComponent(props: LogoutProps) {
  props.logout();
  return (
    <Redirect
      to={{
        pathname: '/',
        state: { from: props.location }
      }}
    />
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({logout: logout}, dispatch);

export const LogOut = connect(undefined, mapDispatchToProps)(LogOutComponent);
