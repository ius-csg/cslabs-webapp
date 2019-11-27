import React, {Component} from 'react';
import {RouteComponentProps, match} from 'react-router';
import { Layout } from '../Layout/Layout';
import { Row, Col, ListGroup, Tab, Nav } from 'react-bootstrap';
import { Lab } from '../../types/Lab';
import {getLab, getLabVmStatuses, startUpVm} from '../../api';
import TestImage from '../../assets/images/topology.png';
import Styles from './Labs.module.scss';
import { Document, Page } from 'react-pdf';
import {LabVm} from '../../types/Module';

type LabProps = RouteComponentProps<{id: string}>;

type TabKeys = 'Topology'|'Read Me';

export interface LabState {
  vms: LabVm[];
  activeTab: TabKeys;
  lab: Lab;
  statuses: {[key: number]: string};
  numPages: number;
  pageNumber: number;
}

class LabPage extends Component<LabProps, LabState, match> {
  state: LabState = {
    vms: [],
    lab: {id: 0, name: '', labType: '', moduleId: 0, userId: 0, labDifficulty: 0, estimatedCpusUsed: 0, estimatedMemoryUsedMb: 0, labVm: []},
    activeTab: 'Read Me',
    statuses: {},
    numPages: 1,
    pageNumber: 1
  };

  async componentDidMount() {
    const lab = await getLab(Number(this.props.match.params.id));
    this.setState({lab: lab[0].id},
      async () => {
        if (this.state.lab) {
          this.setState({
            statuses:  await getLabVmStatuses(this.state.lab.id)
          }, () => {
            for (const vm of this.state.lab.labVm) {
              if (this.state.statuses[vm.id] === 'stopped') {
                  startUpVm(vm.id);
              }
            }
          });
        }
      });
  }

  onDocumentLoadSuccess() {
    const numPages = this.state.numPages;
    this.setState({ numPages });
  }
  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <Layout className={Styles.lab}>
        <h1>Lab {this.state.lab.id}</h1>
        <Tab.Container id='left-tabs-example' defaultActiveKey='topology'>
          <Row>
            <Col sm={3}>
              <Nav variant='pills' className='flex-column'>
                <ListGroup>
                  <ListGroup.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='topology'>Topology</Nav.Link>
                    </Nav.Item>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='readme'>Read Me</Nav.Link>
                    </Nav.Item>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='vmstatutes'>VM Statutes</Nav.Link>
                    </Nav.Item>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='vm1'>VM 1</Nav.Link>
                    </Nav.Item>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Nav.Item>
                      <Nav.Link eventKey='vm2'>VM 2</Nav.Link>
                    </Nav.Item>
                  </ListGroup.Item>
                </ListGroup>
              </Nav>

            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey='topology'>
                  <img src={TestImage} style={{width: 1000, height: 700 }} alt={this.props.match.params.id}/>
                </Tab.Pane>
                <Tab.Pane eventKey='readme'>
                  <h1>Read Me</h1>
                  {this.state.lab}
                  <div>
                    <Document
                      file={'../../assets/pdf/SampleLabReport.pdf'}
                      onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                      <Page pageNumber={pageNumber} />
                    </Document>
                    <p>Page {pageNumber} of {numPages}</p>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey='vmstatutes'>
                  <h1>VM Statutes</h1>
                  {this.state.lab.labVm}
                </Tab.Pane>
                <Tab.Pane eventKey='vm1'>
                  <h1>VM 1</h1>
                </Tab.Pane>
                <Tab.Pane eventKey='vm2'>
                  <h1>VM 2</h1>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Layout>
    );
  }
}

export default LabPage;
