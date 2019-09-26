import * as React from 'react';
import {Component} from 'react';
// import * as styles from './Home.module.scss';
import {getCurrentUser, login} from '../../api';
import {VirtualMachine} from '../../types/VirtualMachine';
import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {Container, Row} from 'react-bootstrap';
import {log} from '../../util';

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
    log( await login('jdeer@iu.edu', 'password'));
    log(await getCurrentUser());
    // this.setState({vms: await listVms()});
  }
}

export default Home;
