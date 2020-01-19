import * as React from 'react';
import {Component} from 'react';
import {ListGroup, Col, Dropdown} from 'react-bootstrap';
// import {LabEnvironment} from '../../components/LabEnvironment/LabEnvironment';
import {isRunning, Statuses, UserLabVm} from '../../types/UserLabVm';
// import ConsoleWindow from '../ConsoleWindow/ConsoleWindow';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import {CenteredIcon} from '../../util/CenteredIcon';
import * as styles from '../../components/LabEnvironment/LabEnvironment.module.scss';
import {getIndicatorClassName} from '../../components/LabEnvironment/LabEnvironment';
import {shutdownVm, startUpVm, stopVm, scrubVm, resetVm} from '../../api';

interface StatusProps {
  vms: UserLabVm[];
  statuses: Statuses;
}

interface StatusState {
  loadingText: string;
}

export class Status extends Component<StatusProps, StatusState> {
  state: StatusState = {loadingText: ''};

  performScrub = (vmId: number) => {
    this.setState({loadingText: 'Scrubbing...'}, async () => {
      await scrubVm(vmId);
      this.setState({loadingText: ''});
    });
  };

  performShutdown = async (vmId: number) => {
    this.setState({loadingText: 'Shutting Down...'});
    setTimeout(() => this.setState({loadingText: ''}), 20000);
    await shutdownVm(vmId);
  };

  render() {
    if (this.props.vms.length > 0) {
      return(
        <ListGroup>
          {this.props.vms.map(vm =>
            <ListGroup.Item key={vm.labVm.name} className={styles['vm-selector']}>
              <Col>{vm.labVm.name}</Col>
              <Col><CenteredIcon className={getIndicatorClassName(isRunning(this.props.statuses[vm.id]))} icon={faPowerOff}/></Col>
              <Col>
                {this.state.loadingText ?
                  <span>{this.state.loadingText}</span> :
                  <Dropdown drop='right'>
                    <Dropdown.Toggle id='dropdown-basic'/>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => startUpVm(vm.id)}>Start Up</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.performShutdown(vm.id)}>Shutdown</Dropdown.Item>
                      <Dropdown.Item onClick={() => stopVm(vm.id)}>Force Shutdown</Dropdown.Item>
                      <Dropdown.Item onClick={() => this.performScrub(vm.id)}>Scrub</Dropdown.Item>
                      <Dropdown.Item onClick={() => resetVm(vm.id)}>Reset</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </Col>
            </ListGroup.Item>)}
      </ListGroup>
      );
    } else {
      return(<h2>No VMs Open</h2>);
    }
  }
}
