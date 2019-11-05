import * as React from 'react';
import {Component} from 'react';
import {Dropdown, ListGroup, Col} from 'react-bootstrap';
// import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {UserLabVm} from '../../types/UserLabVm';
// import ConsoleWindow from '../ConsoleWindow/ConsoleWindow';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {shutdownVm, startUpVm} from '../../api';
import {CenteredIcon} from '../../util/CenteredIcon';
import * as styles from '../../components/LabEnvironment/LabEnvironment.module.scss';
import {VMPowerState} from '../../types/VMPowerState';

interface StatusProps {
  vms: UserLabVm[];
}

function getIndicatorClassName(vm: UserLabVm) {
  return [
    styles['power-indicator'],
    vm.powerState === VMPowerState.POWERED_ON ? styles['on'] : '',
    vm.powerState === VMPowerState.SUSPENDED ? styles['suspended'] : ''
  ].join(' ');
}

export class Status extends Component<StatusProps> {
  render() {
    if (this.props.vms.length > 0) {
      return(
        <ListGroup>
          {this.props.vms.map(vm =>
            <ListGroup.Item key={vm.name} className={styles['vm-selector']}>
              <Col>{vm.name}</Col>
              <Col><CenteredIcon className={getIndicatorClassName(vm)} icon={faPowerOff}/></Col>
              <Col>
                <Dropdown drop='right'>
                  <Dropdown.Toggle id='dropdown-basic'/>
                  <Dropdown.Menu>
                    <Dropdown.Item action={startUpVm(vm.name)}>Start Up</Dropdown.Item>
                    <Dropdown.Item action={shutdownVm(vm.name)}>Shutdown</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
            </ListGroup.Item>)}
      </ListGroup>
      );
    } else {
      return(<h2>No VMs Open</h2>);
    }
  }
}
