import * as React from 'react';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {Redirect} from 'react-router';
import {RoutePaths} from '../../router/RoutePaths';
import {isAuthenticated} from '../../redux/selectors/entities';

class Home extends React.Component<ReturnType<typeof mapStateToProps>> {

  render() {
    if (this.props.authenticated) {
      return <Redirect to={RoutePaths.myModules} />;
    } else {
      return <Redirect to={RoutePaths.explore} />;
    }
  }

}
const mapStateToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});
export default connect(mapStateToProps)(Home);
