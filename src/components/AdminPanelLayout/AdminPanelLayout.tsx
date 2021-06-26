import React from 'react';
import {Layout} from '../../pages/Layout/Layout';
import {Col, ListGroup, ListGroupItem, Row, TabContainer, TabContent} from 'react-bootstrap';
import {StatisticsPane} from './StatisticsPane';
import {ClusterPane} from './ClusterPane';
import UsersPane from './UsersPane';

interface AdminPanelLayoutProps {
  defaultActivePanel?: '#statistics'|'#cluster-management'|'#user-management';
}

export const AdminPanelLayout = (props: AdminPanelLayoutProps) => (
  <Layout>
    <h1>Admin Console</h1>
    <TabContainer defaultActiveKey={(props.defaultActivePanel) ? props.defaultActivePanel : '#statistics'}>
      <Row>
        <Col xs={4}>
          <ListGroup>
            <ListGroupItem variant='danger' action={true} href='#statistics'>Application Statistics</ListGroupItem>
            <ListGroupItem variant='danger' action={true} href='#cluster-management'>Cluster Management</ListGroupItem>
            <ListGroupItem variant='danger' action={true} href='#user-management'>User Management</ListGroupItem>
          </ListGroup>
        </Col>
        <Col xs={8}>
          <TabContent>
            <StatisticsPane/>
            <ClusterPane/>
            <UsersPane/>
          </TabContent>
        </Col>
      </Row>
    </TabContainer>
  </Layout>
);
