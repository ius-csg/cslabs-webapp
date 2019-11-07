import * as React from 'react';
import {Component} from 'react';
import {ListGroup, Col} from 'react-bootstrap';
// import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {isRunning, Statuses, UserLabVm} from '../../types/UserLabVm';
// import ConsoleWindow from '../ConsoleWindow/ConsoleWindow';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {CenteredIcon} from '../../util/CenteredIcon';
import * as styles from '../../components/LabEnvironment/LabEnvironment.module.scss';
import {getIndicatorClassName} from '../../components/LabEnvironment/LabEnvironment';

interface StatusProps {
  vms: UserLabVm[];
  statuses: Statuses;
}


export class Status extends Component<StatusProps> {

  render() {
    if (this.props.vms.length > 0) {
      return(
        <ListGroup>
          {this.props.vms.map(vm =>
            <ListGroup.Item key={vm.labVm.name} className={styles['vm-selector']}>
              <Col>{vm.labVm.name}</Col>
              <Col><CenteredIcon className={getIndicatorClassName(isRunning(this.props.statuses[vm.id]))} icon={faPowerOff}/></Col>
              <Col>
                {/*<Dropdown drop='right'>*/}
                {/*  <Dropdown.Toggle id='dropdown-basic'/>*/}
                {/*  <Dropdown.Menu>*/}
                {/*    <Dropdown.Item action={startUpVm(vm.labVm.name)}>Start Up</Dropdown.Item>*/}
                {/*    <Dropdown.Item action={shutdownVm(vm.labVm.name)}>Shutdown</Dropdown.Item>*/}
                {/*  </Dropdown.Menu>*/}
                {/*</Dropdown>*/}
              </Col>
            </ListGroup.Item>)}
      </ListGroup>
      );
    } else {
      return(<h2>No VMs Open</h2>);
    }
  }
}
