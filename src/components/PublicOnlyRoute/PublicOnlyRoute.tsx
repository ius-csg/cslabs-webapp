import {Route, RouteProps, Redirect} from 'react-router';
import React from 'react';
import {
  mapIsAuthenticatedToProps,
  mapIsAuthenticatedToPropsType
} from '../../redux/selectors/entities';
import {connect} from 'react-redux';

type PublicOnlyRouteProps =  RouteProps & mapIsAuthenticatedToPropsType & {
  component: any;
  redirectTo: string;
};

function PublicOnlyRouteComponent({component: Component, authenticated, redirectTo, ...rest}: PublicOnlyRouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export const PublicOnlyRoute = connect(mapIsAuthenticatedToProps)(PublicOnlyRouteComponent);
