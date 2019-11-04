import * as React from 'react';
import {Component} from 'react';
// import * as styles from './Home.module.scss';
import {VirtualMachine} from '../../types/VirtualMachine';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {VMPowerState} from '../../types/VMPowerState';
import {Layout} from '../Layout/Layout';
import {VMPowerState} from '../../types/VMPowerState';

interface HomeState {
  vms: VirtualMachine[];
}

class Home extends Component<{}, HomeState> {

  state: HomeState  = {vms: [ {proxmoxId: 100, id: 1, name: 'Test', powerState: VMPowerState.POWERED_ON}]};
  render() {
    return  (
      <Layout fluid={true} className='full-height-container'>
          <LabEnvironment vms={this.state.vms}/>
      </Layout>
    );
  }

}

export default Home;
