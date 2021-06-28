import React from 'react';
import {Layout} from '../../pages/Layout/Layout';
import {Col, ListGroup, Row, TabContainer, TabContent} from 'react-bootstrap';
import {StatisticsPane} from './StatisticsPane';
import {ClusterPane} from './ClusterPane';
import UsersPane from './UsersPane';
import {DowntimeScheduler} from './DowntimeScheduler';

interface AdminPanelLayoutProps {
  defaultActivePanel?: '#statistics'|'#cluster-management'|'#user-management';
}

export const AdminPanelLayout = (props: AdminPanelLayoutProps) => (
  <Layout>
    <h1>Admin Console</h1>
    <TabContainer defaultActiveKey={(props.defaultActivePanel) ? props.defaultActivePanel : '#statistics'}>
      <Row>
        <Col xs={4}>
          <ListGroup style={{marginTop: '20px'}}>
            <ListGroup.Item action={true} href='#statistics'>
              Application Statistics
            </ListGroup.Item>
            <ListGroup.Item action={true} href='#cluster-management'>
              Cluster Management
              </ListGroup.Item>
            <ListGroup.Item action={true} href='#user-management'>
              User Management
            </ListGroup.Item>
            <ListGroup.Item action={true} href='#downtime-scheduler'>
              Downtime Scheduler
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col xs={8}>
          <TabContent>
            <StatisticsPane/>
            <ClusterPane/>
            <UsersPane/>
            <DowntimeScheduler/>
          </TabContent>
        </Col>
      </Row>
    </TabContainer>
  </Layout>
);
