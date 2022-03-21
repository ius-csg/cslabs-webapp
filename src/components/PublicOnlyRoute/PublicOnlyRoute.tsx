import {Route, Navigate} from 'react-router';
import {Location} from 'history';
import {
  mapIsAuthenticatedToProps,
  mapIsAuthenticatedToPropsType
} from '../../redux/selectors/entities';
import {connect} from 'react-redux';

type PublicOnlyRouteProps =  mapIsAuthenticatedToPropsType & {
  component: any;
  redirectTo: string;
  location: Location;
};

function PublicOnlyRouteComponent({component: Component, authenticated, redirectTo, ...rest}: PublicOnlyRouteProps) {
  return (
    <Route
      {...rest}
      element={ ({ props } : {props: PublicOnlyRouteProps})  =>
        !authenticated ? (
          <Component {...props} />
        ) : (
          <Navigate
            to={{
              pathname: redirectTo
            }}
            state={{ from: props.location }}
          />
        )
      }
    />
  );
}

export const PublicOnlyRoute = connect(mapIsAuthenticatedToProps)(PublicOnlyRouteComponent);
