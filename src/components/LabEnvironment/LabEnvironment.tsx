import * as React from 'react';
import {Component} from 'react';
import {Button, Col, Container, ListGroup, Row, Tab} from 'react-bootstrap';
import {isRunning} from '../../types/UserLabVm';
import ConsoleWindow from '../ConsoleWindow/ConsoleWindow';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons';
import * as styles from './LabEnvironment.module.scss';
import {CenteredIcon} from '../../util/CenteredIcon';
import {Status} from '../../pages/Status/Status';
import {Document, Page, pdfjs} from 'react-pdf';
import {PDFDocumentProxy} from 'pdfjs-dist';
import {getUserLabReadmeUrl, getUserLabTopologyUrl} from '../../api';
import {UserLab} from '../../types/UserLab';
import {LoadingButton} from '../../util/LoadingButton';
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
    pageNumber: 1
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

  isLabAbleToStart() {
    const status = this.props.userLab.status;
    return status === 'NotStarted';
  }

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <Tab.Container defaultActiveKey='#topology' mountOnEnter={true} unmountOnExit={true}>
        <Container fluid={true} className='full-height-container'>
          <Row noGutters={true} className='justify-content-between'>
            <h2>Lab : {this.props.userLab.lab.name}</h2>
            {this.isLabAbleToStart() ?
              <LoadingButton
                loading={this.props.starting}
                label='Start Lab'
                onClick={this.props.onStartLab}
              /> : null}
          </Row>
          <Row className='fill-height'>
          <Col sm={4} md={4} lg={2}>
            <ListGroup style={{marginTop: 20}}>
              <ListGroup.Item action={true} href='#topology'>Topology</ListGroup.Item>
              <ListGroup.Item action={true} href='#readme'>Readme</ListGroup.Item>
              <ListGroup.Item action={true} href='#status'>Statuses</ListGroup.Item>
              {this.props.userLab.userLabVms.map(vm =>
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
              <h4 style={{textAlign: 'right'}}>Lab's time remaining: {this.props.userLab.endDateTime}</h4>
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
                <Tab.Pane key={vm.labVm.name} eventKey={'#' + vm.labVm.name} className='full-height-container'>
                  <ConsoleWindow vm={vm} status={this.props.statuses[vm.id]} />
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
