import * as React from 'react';
import {Component} from 'react';
// import * as styles from './Home.module.scss';
import {UserLabVm} from '../../types/UserLabVm';
// import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {VMPowerState} from '../../types/VMPowerState';
// import {Layout} from '../Layout/Layout';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {Redirect} from 'react-router';
import {RoutePaths} from '../../router/RoutePaths';
import {isAuthenticated} from '../../redux/selectors/entities';

interface HomeState {
  vms: UserLabVm[];
}

class Home extends Component<ReturnType<typeof mapStateToProps>, HomeState> {

  state: HomeState  = {vms: [ {proxmoxVmId: 100, id: 1, name: 'Test', powerState: VMPowerState.POWERED_ON}]};
  render() {
    if (this.props.authenticated) {
      return <Redirect to={RoutePaths.myModules} />;
    } else {
      return <Redirect to={RoutePaths.login} />;
    }
    // return  (
    //   <Layout fluid={true} className='full-height-container'>
    //       <LabEnvironment vms={this.state.vms}/>
    //   </Layout>
    // );
  }

}
const mapStateToProps = (state: WebState) => ({ authenticated: isAuthenticated(state)});
export default connect(mapStateToProps)(Home);
