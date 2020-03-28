import * as React from 'react';
import {Component} from 'react';
import {ListGroup, Col, Dropdown, Container, Row} from 'react-bootstrap';
import {isRunning, Statuses, UserLabVm} from '../../types/UserLabVm';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {CenteredIcon} from '../../util/CenteredIcon';
import * as styles from '../../components/LabEnvironment/LabEnvironment.module.scss';
import {getIndicatorClassName} from '../../components/LabEnvironment/LabEnvironment';
import {VmActionsMenu} from '../../components/VmActionsMenu/VmActionsMenu';

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
                  <CenteredIcon
                    className={getIndicatorClassName(isRunning(this.props.statuses[vm.id]))}
                    icon={faPowerOff}
                  />
                </Col>
                <Col>
                  {this.state.loadingText ?
                    <span>{this.state.loadingText}</span> :
                    <Dropdown drop='right'>
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
