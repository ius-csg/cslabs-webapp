import * as React from 'react';
import {Component} from 'react';
import {Col, Container, ListGroup, Row, Tab} from 'react-bootstrap';
import {isRunning, UserLabVm} from '../../types/UserLabVm';
import ConsoleWindow from '../ConsoleWindow/ConsoleWindow';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import * as styles from './LabEnvironment.module.scss';
import {CenteredIcon} from '../../util/CenteredIcon';
import {Status} from '../../pages/Status/Status';
import TestImage from '../../assets/images/topology.png';
// @ts-ignore
import TestPdf from '../../assets/pdf/SampleLabReport.pdf';
import {Document, Page, pdfjs} from 'react-pdf';
import {UserLab} from '../../types/Module';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface LabEnvironmentProps {
  vms: UserLabVm[];
  statuses: {[key: number]: string};
  userLab?: UserLab;
  numPages?: number;
  pageNumber?: number;
}

export function getIndicatorClassName(running: boolean) {
  return [
    styles['power-indicator'],
    running ? styles['on'] : '',
    !running ? styles['suspended'] : ''
  ].join(' ');
}

export class LabEnvironment extends Component<LabEnvironmentProps> {

  state: LabEnvironmentProps = {
    vms: [],
    statuses: {},
    numPages: 1,
    pageNumber: 1
  };

  /*
  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
*/
  // @ts-ignore
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <Tab.Container defaultActiveKey='#status' mountOnEnter={true} unmountOnExit={false}>
        <Container className='full-height-container'>
          <h2>Lab : {this.props.userLab}</h2>
          <Row className='fill-height'>
          <Col sm={4} md={4} lg={2}>
            <ListGroup>
              <ListGroup.Item action={true} href='#topology'>Topology</ListGroup.Item>
              <ListGroup.Item action={true} href='#readme'>Readme</ListGroup.Item>
              <ListGroup.Item action={true} href='#status'>Statuses</ListGroup.Item>
              <ListGroup.Item action={true} href='#vm1'>VM 1</ListGroup.Item>
              <ListGroup.Item action={true} href='#vm2'>VM 2</ListGroup.Item>
            </ListGroup>
            <ListGroup style={{marginTop: 20}}>
              {this.props.vms.map(vm =>
                <ListGroup.Item key={vm.labVm.name} action={true} href={'#' + vm.labVm.name} className={styles['vm-selector']}>
                  <span>
                    <CenteredIcon className={getIndicatorClassName(isRunning(this.props.statuses[vm.id]))}  icon={faPowerOff} />
                    <span>{vm.labVm.name}</span>
                  </span>
                </ListGroup.Item>)}
            </ListGroup>
          </Col>
          <Col sm={8} md={8} lg={10} className='full-height-container'>
            <Tab.Content className='full-height-container'>
              <Tab.Pane eventKey='#topology'>
                <h2>Topology</h2>
                <img src={TestImage} style={{width: 1000, height: 700 }} alt={'topology picture'}/>
              </Tab.Pane>
              <Tab.Pane eventKey='#readme'>
                <h1>Read Me</h1>
                {this.state.userLab}
                <div style={{ width: 1000 }}>
                  <Document
                    file={TestPdf}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                  >
                    <Page pageNumber={pageNumber} width={1000} />
                  </Document>
                  <div>
                    <p>Page {pageNumber} of {numPages}</p>
                  </div>
                </div>
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
                <Status vms={this.props.vms} statuses={this.props.statuses}/>
              </Tab.Pane>
              { this.props.vms.map(vm =>
                <Tab.Pane key={vm.labVm.name} eventKey={'#' + vm.labVm.name} className='full-height-container'>
                  <ConsoleWindow vm={vm} status={this.props.statuses[vm.id]} />
                </Tab.Pane>
              )}
              <Tab.Pane eventKey='#vm1'>
                <h1>VM 1</h1>
              </Tab.Pane>
              <Tab.Pane eventKey='#vm2'>
                <h1>VM 2</h1>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          </Row>
        </Container>
      </Tab.Container>
    );
  }

}
