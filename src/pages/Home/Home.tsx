import * as React from 'react';
import {Component} from 'react';
// import * as styles from './Home.module.scss';
import {VirtualMachine} from '../../types/VirtualMachine';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {Container, Row} from 'react-bootstrap';
import {VMPowerState} from '../../types/VMPowerState';

interface HomeState {
  vms: VirtualMachine[];
}

class Home extends Component<{}, HomeState> {

  state: HomeState  = {vms: [
      {
        powerState: VMPowerState.POWERED_ON,
        name: 'test'
      }
    ]};
  render() {
    return  (
      <Container fluid={true}>
        <Row style={{marginTop: 20 }}>
          <LabEnvironment vms={this.state.vms}/>
        </Row>
      </Container>
    );
  }

}

export default Home;
