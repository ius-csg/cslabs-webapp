import * as React from 'react';
import {Component} from 'react';
import {Button, Col, Container, Dropdown, ButtonGroup, ListGroup, Row, Tab} from 'react-bootstrap';
import {isRunning} from '../../types/UserLabVm';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import * as styles from './LabEnvironment.module.scss';
import {CenteredIcon} from '../../util/CenteredIcon';
import {Status} from '../../pages/Status/Status';
import {Document, Page, pdfjs} from 'react-pdf';
import {PDFDocumentProxy} from 'pdfjs-dist';
import {getUserLabReadmeUrl, getUserLabTopologyUrl} from '../../api';
import {UserLab} from '../../types/UserLab';
import {LoadingButton} from '../../util/LoadingButton';
import {getRemainingLabTime} from '../../util';
import {ConsoleWindowContainer} from '../ConsoleWindow/ConsoleWindowContainer';
import {VmActionsMenu} from '../VmActionsMenu/VmActionsMenu';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

interface LabEnvironmentProps {
  statuses: {[key: number]: string};
  userLab: UserLab;
  starting: boolean;
  onStartLab: () => void;
}

interface LabEnvironmentState {
  numPages: number;
  pageNumber: number;
  readmeLoaded: boolean;
  show_vm: boolean;
  eventKey: string;
}

export function getIndicatorClassName(running: boolean) {
  return [
    styles['power-indicator'],
    running ? styles['on'] : '',
    !running ? styles['suspended'] : ''
  ].join(' ');
}
export class LabEnvironment extends Component<LabEnvironmentProps, LabEnvironmentState> {

  state: LabEnvironmentState = {
    numPages: 1,
    readmeLoaded: false,
    pageNumber: 1,
    show_vm: false,
    eventKey: '#topology'
  };

  canGoToPrevPage = () => this.state.pageNumber > 1;
  canGoToNextPage = () => this.state.pageNumber < this.state.numPages;

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    this.setState({ numPages: pdf.numPages, readmeLoaded: true});
  };

  onEventKeyChange = (eventKey: string) => {
    this.setState( {eventKey: eventKey});
  };

  isLabAbleToStart() {
    const status = this.props.userLab.status;
    return status === 'NotStarted';
  }

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <Tab.Container activeKey={this.state.eventKey} onSelect={this.onEventKeyChange} mountOnEnter={true} unmountOnExit={false}>
        <Container fluid={true} className='full-height-container'>
          <Row noGutters={true} className='justify-content-between'>
            <h2>Lab : {this.props.userLab.lab.name}</h2>
            {this.isLabAbleToStart() ?
              <LoadingButton
                loading={this.props.starting}
                label='Start Lab'
                onClick={this.props.onStartLab}
              /> : <h6 style={{textAlign: 'right'}}>Lab's time remaining: {getRemainingLabTime(this.props.userLab.endDateTime!)}</h6>}
          </Row>
          <Row className='fill-height'>
            <Col sm={4} md={4} lg={2}>
              <ListGroup style={{marginTop: 20}}>
                <ListGroup.Item action={true} href='#topology'>Topology</ListGroup.Item>
                <ListGroup.Item action={true} href='#readme'>Readme</ListGroup.Item>
                <ListGroup.Item action={true} href='#status'>Statuses</ListGroup.Item>
                {this.props.userLab.userLabVms.map((vm, index) =>
                  <Dropdown key={vm.id} as={ButtonGroup}>
                    <Button
                        variant='outline-secondary'
                        style={{
                          textAlign: 'left',
                          padding: '0.75rem 1.25rem',
                          border: '1px solid rgba(0,0,0,0.125)',
                          borderRadius: 0,
                          borderTop: 0,
                          color: 'black'}}
                        href={'#' + vm.labVm.name}
                        onClick={() => this.onEventKeyChange('#' + vm.labVm.name)}
                    >
                      <CenteredIcon className={getIndicatorClassName(isRunning(this.props.statuses[vm.id]))}  icon={faPowerOff} />
                      {vm.labVm.name}
                    </Button>
                    <Dropdown.Toggle
                      split={true}
                      variant='outline-secondary'
                      id='dropdown-split-basic'
                      style={{
                        padding: '0.75rem 1.25rem',
                        border: '1px solid rgba(0,0,0,0.125)',
                        borderTop: 0,
                        borderLeft: 0,
                        borderRadius: 0}}
                    />
                    <VmActionsMenu vm={vm}/>
                  </Dropdown>)}
              </ListGroup>
            </Col>
            <Col sm={8} md={8} lg={10} className='full-height-container'>
              <Tab.Content className='full-height-container'>
                <Tab.Pane eventKey='#topology'>
                  <h2>Topology</h2>
                  {!this.props.userLab.hasTopology ?
                    <p style={{textAlign: 'center'}}>No Topology Available</p> :
                    <img src={getUserLabTopologyUrl(this.props.userLab.id)} style={{width: 1000, height: 700 }} alt={'topology'}/>
                  }
                </Tab.Pane>
                <Tab.Pane eventKey='#readme'>
                  <h2>Read Me</h2>
                  {!this.props.userLab.hasReadme ?
                    <p style={{textAlign: 'center'}}>No Readme Available</p> :
                    <div style={{width: 1000}}>
                      { this.state.readmeLoaded ?
                        <div>
                          <span style={{marginRight: '1rem'}}>Page {pageNumber} of {numPages}</span>
                          <Button style={{marginRight: '1rem'}} onClick={this.goToPrevPage} disabled={!this.canGoToPrevPage()}>Previous Page</Button>
                          <Button onClick={this.goToNextPage} disabled={!this.canGoToNextPage()}>Next Page</Button>
                        </div> : null
                      }
                      <Document
                        file={getUserLabReadmeUrl(this.props.userLab.id)}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                      >
                        <Page pageNumber={pageNumber} width={1000}/>
                      </Document>
                    </div>
                  }
                </Tab.Pane>
                <Tab.Pane eventKey='#status'>
                  <h2>VM Status</h2>
                  <Status vms={this.props.userLab.userLabVms} statuses={this.props.statuses}/>
                </Tab.Pane>
                { this.props.userLab.userLabVms.map(vm =>
                  <Tab.Pane
                    key={vm.labVm.name}
                    eventKey={'#' + vm.labVm.name}
                    style={this.state.eventKey==='#' + vm.labVm.name ? {} : {display:'none !important'}}
                    className='full-height-container'
                  >
                    <ConsoleWindowContainer vm={vm} status={this.props.statuses[vm.id]}/>
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
