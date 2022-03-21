import {Navigate, useLocation} from 'react-router';
import {logout} from '../../api';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';

type LogoutProps = ReturnType<typeof mapDispatchToProps> & {
  label?: string;
};

export function LogOutComponent(props: LogoutProps) {
  const location = useLocation();
  props.logout();
  return (
    <Navigate
      to={{pathname: '/'}}
      replace={true}
      state={{ from: location }}
    />
  );
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({logout: logout}, dispatch);

export const LogOut = connect(undefined, mapDispatchToProps)(LogOutComponent);
