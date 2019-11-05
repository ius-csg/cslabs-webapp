import {Route, RouteProps, Redirect} from 'react-router';
import React from 'react';
import {RoutePaths} from '../../router/RoutePaths';
import {
  mapIsAuthenticatedToProps,
  mapIsAuthenticatedToPropsType
} from '../../redux/selectors/entities';
import {connect} from 'react-redux';

type PrivateRouteProps = mapIsAuthenticatedToPropsType & RouteProps & {
  component: any;
};

function PrivateRouteComponent({component: Component, authenticated, ...rest}: PrivateRouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: RoutePaths.login,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export const PrivateRoute = connect(mapIsAuthenticatedToProps)(PrivateRouteComponent);
