import { Component } from 'react';
import {ListGroup, Col, Dropdown, Container, Row} from 'react-bootstrap';
import {Statuses, UserLabVm} from '../../types/UserLabVm';
import * as styles from '../../components/LabEnvironment/LabEnvironment.module.scss';
import {VmActionsMenu} from '../../components/VmActionsMenu/VmActionsMenu';
import {VmStatusIndicator} from '../../components/util/VmStatusIndicator/VmStatusIndicator';

interface StatusProps {
  vms: UserLabVm[];
  statuses: Statuses;
}

interface StatusState {
  loadingText: string;
}

export class Status extends Component<StatusProps, StatusState> {
  state: StatusState = {loadingText: ''};

  render() {
    if (this.props.vms.length > 0) {
      return (
        <>
          <Container fluid={true}>
            <Row>
              <Col>Name</Col>
              <Col>Status</Col>
              <Col>Options</Col>
            </Row>
          </Container>
          <ListGroup>
            {this.props.vms.map(vm =>
              <ListGroup.Item key={vm.labVm.name} className={styles['vm-selector']}>
                <Col>{vm.labVm.name}</Col>
                <Col>
                  <VmStatusIndicator status={this.props.statuses[vm.id]}/>
                </Col>
                <Col>
                  {this.state.loadingText ?
                    <span>{this.state.loadingText}</span> :
                    <Dropdown drop='end'>
                      <Dropdown.Toggle id='dropdown-basic'/>
                      <VmActionsMenu vm={vm}/>
                    </Dropdown>
                  }
                </Col>
              </ListGroup.Item>)}
          </ListGroup>
        </>
      );
    } else {
      return (<p style={{textAlign: 'center'}}>No VMs Instantiated</p>);
    }
  }
}
