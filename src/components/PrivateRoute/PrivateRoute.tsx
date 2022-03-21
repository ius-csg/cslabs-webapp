import {Navigate, useLocation} from 'react-router';
import {RoutePaths} from '../../router/RoutePaths';
import {
  mapIsAuthenticatedToProps,
  mapIsAuthenticatedToPropsType
} from '../../redux/selectors/entities';
import {connect} from 'react-redux';

type PrivateRouteProps = mapIsAuthenticatedToPropsType & {
  component: any;
};

function PrivateRouteComponent({component: Component, authenticated}: PrivateRouteProps) {
  const location = useLocation();
  return (
        authenticated ? (
          <Component />
        ) : (
          <Navigate to={{pathname: RoutePaths.login}} replace={true} state={{ from: location }} />
        )
  );
}

export const PrivateRoute = connect(mapIsAuthenticatedToProps)(PrivateRouteComponent);
