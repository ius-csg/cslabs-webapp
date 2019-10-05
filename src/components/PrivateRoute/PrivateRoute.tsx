import {Route, RouteProps, Redirect} from 'react-router';
import React from 'react';
import {isAuthenticated} from '../../api';
import {RoutePaths} from '../../router/RoutePaths';

interface PrivateRoute extends RouteProps {
  component: any;
}

export function PrivateRoute({component: Component, ...rest}: PrivateRoute) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
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
