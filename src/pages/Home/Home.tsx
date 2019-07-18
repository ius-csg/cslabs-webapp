import * as React from 'react';
import {Component} from 'react';
import ConsoleContainer from '../../components/ConsoleContainer/ConsoleContainer';
import * as styles from './Home.module.scss';
import {listVms} from '../../api2';

class Home extends Component {

  state = {vms: []};
  render() {
    return  (
      <div className={styles.container}>
        <ConsoleContainer vms={this.state.vms}/>
        <ConsoleContainer vms={this.state.vms}/>
      </div>
    );
  }

  async componentDidMount() {
    this.setState({vms: await listVms()});
  }
}

export default Home;
