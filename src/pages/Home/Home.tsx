import * as React from 'react';
import {Component} from 'react';
// import * as styles from './Home.module.scss';
import {VirtualMachine} from '../../types/VirtualMachine';
// import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {VMPowerState} from '../../types/VMPowerState';
// import {Layout} from '../Layout/Layout';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {User} from '../../types/User';
import {Redirect} from 'react-router';
import {RoutePaths} from '../../router/RoutePaths';

interface HomeState {
  vms: VirtualMachine[];
}

class Home extends Component<{user?: User}, HomeState> {

  state: HomeState  = {vms: [ {proxmoxId: 100, id: 1, name: 'Test', powerState: VMPowerState.POWERED_ON}]};
  render() {
    if (this.props.user) {
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

export default connect((state: WebState) => ({ user: state.entities.currentUser}))(Home);
