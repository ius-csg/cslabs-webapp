import React from 'react';
import {Layout} from '../../pages/Layout/Layout';
import {Col, ListGroup, ListGroupItem, TabContainer, TabContent, TabPane} from 'react-bootstrap';

interface AdminPanelLayoutProps {
  defaultActivePanel?: '#statistics'|'#cluster-management'|'#user-management';
}

export const AdminPanelLayout = (props: AdminPanelLayoutProps) => (
  <Layout>
    <h1>Admin Console</h1>
    <TabContainer defaultActiveKey={(props.defaultActivePanel) ? props.defaultActivePanel : '#statistics'}>
      <Col sm={4}>
        <ListGroup>
          <ListGroupItem action={true} href='#statistics'>Application Statistics</ListGroupItem>
          <ListGroupItem action={true} href='#cluster-management'>Cluster Management</ListGroupItem>
          <ListGroupItem action={true} href='#user-management'>Cluster Management</ListGroupItem>
        </ListGroup>
      </Col>
      <Col sm={8}>
        <TabContent>
          <TabPane eventKey='#statistics'>
            <p>The statistics panel is still under construction</p>
          </TabPane>
          <TabPane eventKey='#cluster-management'>
            <p>The cluster management panel is still under construction</p>
          </TabPane>
          <TabPane eventKey='#user-management'>
            <p>The user-management panel is still under construction</p>
          </TabPane>
        </TabContent>
      </Col>
    </TabContainer>
  </Layout>
);
