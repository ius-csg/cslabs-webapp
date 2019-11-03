import * as React from 'react';
import {Component} from 'react';
import {Dropdown, ListGroup} from 'react-bootstrap';
// import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {VirtualMachine} from '../../types/VirtualMachine';
// import ConsoleWindow from '../ConsoleWindow/ConsoleWindow';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {CenteredIcon} from '../../util/CenteredIcon';
import * as styles from '../../components/LabEnvironment/LabEnvironment.module.scss';
import {VMPowerState} from '../../types/VMPowerState';

interface StatusProps {
  vms: VirtualMachine[];
}

function getIndicatorClassName(vm: VirtualMachine) {
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
              <CenteredIcon className={getIndicatorClassName(vm)} icon={faPowerOff}/>
              <span>
                <span>{vm.name}</span>
              </span>
              <Dropdown as='span' drop='right'>
                <Dropdown.Toggle as='span' id='dropdown-basic'/>
                <Dropdown.Menu>
                  <Dropdown.Item href='#/action-1'>Start Up</Dropdown.Item>
                  <Dropdown.Item href='#/action-2'>Shutdown</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>)}
      </ListGroup>
      );
    } else {
      return(<h2>No VMs Open</h2>);
    }
  }
}
