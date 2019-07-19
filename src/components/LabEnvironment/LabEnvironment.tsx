import * as React from 'react';
import {Component} from 'react';
import {Col, Container, ListGroup, OverlayTrigger, Row, Tab, Tooltip} from 'react-bootstrap';
import {VirtualMachine} from '../../types/VirtualMachine';
import ConsoleWindow from '../ConsoleWindow/ConsoleWindow';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import * as styles from './LabEnvironment.module.scss';
import {getPowerStateLabel, VMPowerState} from '../../types/VMPowerState';
import {CenteredIcon} from '../../util/CenteredIcon';

interface LabEnvironmentProps {
  vms: VirtualMachine[];
}

function getIndicatorClassName(vm: VirtualMachine) {
  return [
    styles['power-indicator'],
    vm.powerState === VMPowerState.POWERED_ON ? styles['on'] : '',
    vm.powerState === VMPowerState.SUSPENDED ? styles['suspended'] : ''
  ].join(' ');
}

export class LabEnvironment extends Component<LabEnvironmentProps> {

  render() {
    return (
      <Tab.Container id='list-group-tabs-example' defaultActiveKey='#topology' mountOnEnter={true}>
        <Container fluid={true}>
          <Row>
          <Col sm={4} md={4} lg={2}>
            <ListGroup>
              <ListGroup.Item action={true} href='#topology'>Topology</ListGroup.Item>
              <ListGroup.Item action={true} href='#readme'>Readme</ListGroup.Item>
              <ListGroup.Item action={true} href='#status'>Status</ListGroup.Item>
            </ListGroup>
            <ListGroup>
              {this.props.vms.map(vm =>
                <ListGroup.Item key={vm.name} action={true} href={'#' + vm.name}>
                  <CenteredIcon className={getIndicatorClassName(vm)}  icon={faPowerOff} />
                  {vm.name}
                </ListGroup.Item>)}
            </ListGroup>
          </Col>
          <Col sm={8} md={8} lg={10}>
            <Tab.Content>
              <Tab.Pane eventKey='#topology'>
                <h2>Topology</h2>
              </Tab.Pane>
              <Tab.Pane eventKey='#readme'>
                <h2>Readme</h2>
              </Tab.Pane>
              <Tab.Pane eventKey='#status'>
                <h2>Status</h2>
              </Tab.Pane>
              { this.props.vms.map(vm =>
                <Tab.Pane key={vm.name} eventKey={'#' + vm.name}>
                  <h2>
                    {vm.name}
                    <OverlayTrigger placement='bottom' overlay={<Tooltip id='tooltip-bottom'>{getPowerStateLabel(vm.powerState)}</Tooltip>}>
                      <CenteredIcon className={getIndicatorClassName(vm)}  icon={faPowerOff} />
                    </OverlayTrigger>
                  </h2>
                  <ConsoleWindow vm={vm}/>
                </Tab.Pane>
              )}
            </Tab.Content>
          </Col>
          </Row>
        </Container>
      </Tab.Container>
    );
  }

}
