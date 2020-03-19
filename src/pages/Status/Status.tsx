import * as React from 'react';
import {Component} from 'react';
import {ListGroup, Col, Dropdown, Container, Row} from 'react-bootstrap';
import {isRunning, Statuses, UserLabVm} from '../../types/UserLabVm';
import {faPowerOff, faPlay, faUndo} from '@fortawesome/free-solid-svg-icons';
import {CenteredIcon} from '../../util/CenteredIcon';
import * as styles from '../../components/LabEnvironment/LabEnvironment.module.scss';
import {getIndicatorClassName} from '../../components/LabEnvironment/LabEnvironment';
import {shutdownVm, startUpVm, stopVm, scrubVm, resetVm} from '../../api';
import * as optionStyles from './Status.module.scss';

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
    if(window.confirm("Are you sure you wish to scrub this VM?"))
    {
      this.setState({loadingText: 'Scrubbing...'}, async () => {
        await scrubVm(vmId);
        this.setState({loadingText: ''});
      });
    }

  };

  performShutdown = async (vmId: number) => {
    this.setState({loadingText: 'Shutting Down...'});
    setTimeout(() => this.setState({loadingText: ''}), 20000);
    await shutdownVm(vmId);
  };

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
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => startUpVm(vm.id)}><CenteredIcon icon={faPlay} className='start-button'/>Start Up
                        
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => this.performShutdown(vm.id)}><CenteredIcon icon={faPowerOff} className={optionStyles['shut-down-button']}/>Shutdown</Dropdown.Item>
                        <Dropdown.Item onClick={() => stopVm(vm.id)}><CenteredIcon icon={faPowerOff} className={optionStyles['force-shut-down-button']}/>Force Shutdown</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.performScrub(vm.id)}><CenteredIcon icon={faUndo} className={optionStyles['scrub-button']}/>Scrub</Dropdown.Item>
                        <Dropdown.Item onClick={() => resetVm(vm.id)}><CenteredIcon icon={faUndo} className={optionStyles['reset-button']}/>Reset</Dropdown.Item>
                      </Dropdown.Menu>
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
