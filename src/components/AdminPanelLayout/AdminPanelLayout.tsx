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
          <ListGroup style={styles.listGroup}>
            <ListGroup.Item action={true} href='#statistics'>
              <span>Application Statistics</span>
            </ListGroup.Item>
            <ListGroup.Item action={true} href='#cluster-management'>
              <span>Cluster Management</span>
              </ListGroup.Item>
            <ListGroup.Item action={true} href='#user-management'>
              <span>User Management</span>
            </ListGroup.Item>
            <ListGroup.Item action={true} href='#downtime-scheduler'>
              <span>Downtime Scheduler</span>
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

const styles = {
  listGroup: {
    marginTop: '20px',
    '&.active': {
      backgroundColor: '#d9534f'
    }
  }
};
