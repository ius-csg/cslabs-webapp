import * as React from 'react';
import {Component} from 'react';
import {Col, Container, ListGroup, Row, Tab} from 'react-bootstrap';
import {UserLabVm} from '../../types/UserLabVm';
import ConsoleWindow from '../ConsoleWindow/ConsoleWindow';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import * as styles from './LabEnvironment.module.scss';
import {VMPowerState} from '../../types/VMPowerState';
import {CenteredIcon} from '../../util/CenteredIcon';
import {Lorem} from '../util/Lorem';
import {Status} from '../../pages/Status/Status';

interface LabEnvironmentProps {
  vms: UserLabVm[];
}

function getIndicatorClassName(vm: UserLabVm) {
  return [
    styles['power-indicator'],
    vm.powerState === VMPowerState.POWERED_ON ? styles['on'] : '',
    vm.powerState === VMPowerState.SUSPENDED ? styles['suspended'] : ''
  ].join(' ');
}

export class LabEnvironment extends Component<LabEnvironmentProps> {

  render() {
    return (
      <Tab.Container defaultActiveKey='#status' mountOnEnter={true} unmountOnExit={false}>
        <Container className='full-height-container'>
          <Row className='fill-height'>
          <Col sm={4} md={4} lg={2}>
            <ListGroup>
              {/*<ListGroup.Item action={true} href='#topology'>Topology</ListGroup.Item>*/}
              {/*<ListGroup.Item action={true} href='#readme'>Readme</ListGroup.Item>*/}
              <ListGroup.Item action={true} href='#status'>Statuses</ListGroup.Item>
            </ListGroup>
            <ListGroup style={{marginTop: 20}}>
              {this.props.vms.map(vm =>
                <ListGroup.Item key={vm.labVm.name} action={true} href={'#' + vm.labVm.name} className={styles['vm-selector']}>
                  <span>
                    <CenteredIcon className={getIndicatorClassName(vm)}  icon={faPowerOff} />
                    <span>{vm.labVm.name}</span>
                  </span>
                </ListGroup.Item>)}
            </ListGroup>
          </Col>
          <Col sm={8} md={8} lg={10} className='full-height-container'>
            <Tab.Content className='full-height-container'>
              <Tab.Pane eventKey='#topology'>
                <h2>Topology</h2>
                <Lorem/>
              </Tab.Pane>
              <Tab.Pane eventKey='#readme'>
                <h2>Readme</h2>
                <Lorem/>
              </Tab.Pane>
              <Tab.Pane eventKey='#status'>
                <h2>VM Status</h2>
                <Container>
                  <Row>
                    <Col>Name</Col>
                    <Col>Status</Col>
                    <Col>Options</Col>
                  </Row>
                </Container>
                <Status vms={this.props.vms}/>
              </Tab.Pane>
              { this.props.vms.map(vm =>
                <Tab.Pane key={vm.labVm.name} eventKey={'#' + vm.labVm.name} className='full-height-container'>
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
