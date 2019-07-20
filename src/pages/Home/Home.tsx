import * as React from 'react';
import {Component} from 'react';
// import * as styles from './Home.module.scss';
import {listVms} from '../../api';
import {VirtualMachine} from '../../types/VirtualMachine';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {Container, Row} from 'react-bootstrap';

interface HomeState {
  vms: VirtualMachine[];
}

class Home extends Component<{}, HomeState> {

  state: HomeState  = {vms: []};
  render() {
    return  (
      <Container fluid={true}>
        <Row style={{marginTop: 20 }}>
          <LabEnvironment vms={this.state.vms}/>
        </Row>
      </Container>
    );
  }

  async componentDidMount() {
    this.setState({vms: await listVms()});
  }
}

export default Home;
