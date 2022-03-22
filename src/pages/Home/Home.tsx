import { Component } from 'react';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {Navigate} from 'react-router';
import {RoutePaths} from '../../router/RoutePaths';
import {isAuthenticated} from '../../redux/selectors/entities';

class Home extends Component<ReturnType<typeof mapStateToProps>> {

  render() {
    if (this.props.authenticated) {
      return <Navigate to={RoutePaths.myModules} replace={true} />;
    } else {
      return <Navigate to={RoutePaths.explore} replace={true} />;
    }
  }

}
const mapStateToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});
export default connect(mapStateToProps)(Home);
