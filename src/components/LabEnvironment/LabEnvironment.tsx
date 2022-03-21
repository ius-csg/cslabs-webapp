import {Component} from 'react';
import {Button, Col, Container, Dropdown, ButtonGroup, ListGroup, Row, Tab} from 'react-bootstrap';
import {Status} from '../../pages/Status/Status';
import {Document, Page, pdfjs} from 'react-pdf';
import {PDFDocumentProxy} from 'pdfjs-dist';
import {getUserLabReadmeUrl, getUserLabTopologyUrl, updateEndDateTime} from '../../api';
import {UserLab} from '../../types/UserLab';
import {LoadingButton} from '../../util/LoadingButton';
import {combineClasses, getRemainingLabTime, getLuxonObjectFromString} from '../../util';
import {ConsoleWindowContainer} from '../ConsoleWindow/ConsoleWindowContainer';
import {VmActionsMenu} from '../VmActionsMenu/VmActionsMenu';
import {VmStatusIndicator} from '../util/VmStatusIndicator/VmStatusIndicator';
import styles from './LabEnvironment.module.scss';
import {RoutePaths} from 'router/RoutePaths';
import Popup from '../util/Popup';

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
  labEndDateTime?: string;
  interval: number;
}

export class LabEnvironment extends Component<LabEnvironmentProps, LabEnvironmentState> {

  state: LabEnvironmentState = {
    numPages: 1,
    readmeLoaded: false,
    pageNumber: 1,
    show_vm: false,
    eventKey: '#topology',
    labEndDateTime: this.props.userLab.endDateTime!,
    interval: 0
  };

  componentDidMount() {
    this.setLabEndDateTimeInterval(this.props.userLab);
  }

  componentWillUnmount() {
    window.clearInterval(this.state.interval);
  }

  canGoToPrevPage = () => this.state.pageNumber > 1;
  canGoToNextPage = () => this.state.pageNumber < this.state.numPages;

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  onDocumentLoadSuccess = (pdf: PDFDocumentProxy) => {
    this.setState({ numPages: pdf.numPages, readmeLoaded: true});
  };

  onEventKeyChange = (eventKey: string | null) => {
    this.setState( {eventKey: eventKey!});
  };

  isLabAbleToStart() {
    return this.props.userLab.status !== 'Started';
  }

  setLabEndDateTimeInterval = (userLab: UserLab) => {
    this.state.interval = window.setInterval(() => {
      this.setState({ labEndDateTime: userLab.endDateTime! });
    }, 1000);
  }

  onExtendEndDateTime = async () => {
    const updatedUserLab = await updateEndDateTime(this.props.userLab.id);
    window.clearInterval(this.state.interval);
    this.setState({ labEndDateTime: updatedUserLab.endDateTime! });
    this.setLabEndDateTimeInterval(updatedUserLab);
  };

  showExtendButton = () => {
    const remainingLabTime = getLuxonObjectFromString(this.state.labEndDateTime!).toLocal().diffNow().as('second');
    // shows a pop up if the lab times up instead of providing an extend option
    if (getRemainingLabTime(this.state.labEndDateTime) === 'Times up!') {
      const handler = window.setTimeout(() => {
        window.location.replace(RoutePaths.myModules);
      }, 15000);

      const onModuleRedirect = () => {
        window.clearTimeout(handler);
        window.location.replace(RoutePaths.myModules);
      };
      return (
        <Popup
          id='times-up'
          title='Times up!'
          description='Congratulations! You have finished working on this lab.
            You will be automatically redirected to your modules page after 15 seconds.'
          rightButton={<Button onClick={onModuleRedirect} className='btn btn-primary'>My Modules</Button>}
          size='sm'
          display={true}
        />
      );
    } else if (remainingLabTime > 0 && remainingLabTime <= 900) {      
      return <Button className='ms-2' onClick={this.onExtendEndDateTime}>Extend</Button>;
    } else {
      return;
    }
  }

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <Tab.Container activeKey={this.state.eventKey} onSelect={this.onEventKeyChange} mountOnEnter={true} unmountOnExit={false}>
        <Container fluid={true} className='full-height-container'>
          <Row>
            <h2>Lab : {this.props.userLab.lab.name}</h2>
            <Col className='text-end'>
              {this.isLabAbleToStart() ?
                <LoadingButton
                  loading={this.props.starting}
                  label='Start Lab'
                  onClick={this.props.onStartLab} 
                /> : this.props.userLab.lab.type === 'Temporary' &&
                <h6 style={{textAlign: 'right'}}>Lab's time remaining: {getRemainingLabTime(this.state.labEndDateTime)}{this.showExtendButton()}</h6>
              }
            </Col>
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
                      <VmStatusIndicator status={this.props.statuses[vm.id]}/>
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
                    <img src={getUserLabTopologyUrl(this.props.userLab.lab.id)} style={{width: 1000, height: 700 }} alt={'topology'}/>
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
                        file={getUserLabReadmeUrl(this.props.userLab.lab.id)}
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
                    style={this.state.eventKey === '#' + vm.labVm.name ? {} : {display: 'none !important'}}
                    className={combineClasses(
                      'full-height-container',
                      (this.state.eventKey !== '#' + vm.labVm.name ? `${styles['hide']} ${styles['force']}` : '')
                    )}
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
