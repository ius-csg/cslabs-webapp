import {Route, RouteProps, Redirect} from 'react-router';
import React from 'react';
import {isAuthenticated} from '../../api';

interface PublicOnlyRouteProps extends RouteProps {
  component: any;
  redirectTo: string;
}

export function PublicOnlyRoute({component: Component, redirectTo, ...rest}: PublicOnlyRouteProps) {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated() ? (
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
