import * as React from 'react';
import {Component} from 'react';
import ConsoleWindow from '../../components/ConsoleWindow/ConsoleWindow';
import * as styles from './Home.module.scss';
import {listVms} from '../../api';
import {VirtualMachine} from '../../types/VirtualMachine';

interface HomeState {
  vms: VirtualMachine[];
}

class Home extends Component<{}, HomeState> {

  state: HomeState  = {vms: []};
  render() {
    return  (
      <div className={styles.container}>
        <ConsoleWindow vms={this.state.vms}/>
        <ConsoleWindow vms={this.state.vms}/>
      </div>
    );
  }

  async componentDidMount() {
    this.setState({vms: await listVms()});
  }
}

export default Home;
