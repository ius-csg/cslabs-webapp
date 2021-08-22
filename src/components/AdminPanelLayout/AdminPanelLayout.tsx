import React from 'react';
import {Layout} from '../../pages/Layout/Layout';
import {Col, ListGroup, Row, TabContainer, TabContent, TabPane} from 'react-bootstrap';
import {StatisticsPane} from './StatisticsPane';
import {ClusterPane} from './ClusterPane';
import UsersPane from './UsersPane';
import {DowntimeScheduler} from './DowntimeScheduler';
import {cast} from '../../util';

interface AdminPanelLayoutProps {
  defaultActivePanel?: AdminTabKeys;
}

const panes = [
  {label: 'Application Statistics', eventKey: '#statistics', component: <StatisticsPane/>},
  {label: 'Cluster Management', eventKey: '#cluster-management', component: <ClusterPane/>},
  {label: 'User Management', eventKey: '#user-management', component: <UsersPane/>},
  {label: 'Downtime Scheduler', eventKey: '#downtime-scheduler', component: <DowntimeScheduler/>}
] as const;

type AdminTabKeys = typeof panes[number]['eventKey'];

export const AdminPanelLayout = (props: AdminPanelLayoutProps) => (
  <Layout>
    <h1>Admin Console</h1>
    <TabContainer
      defaultActiveKey={cast<AdminTabKeys>(props.defaultActivePanel ? props.defaultActivePanel : '#statistics')}
    >
      <Row>
        <Col xs={4}>
          <ListGroup style={{marginTop: '20px'}}>
            {panes.map(pane => (
              <ListGroup.Item key={pane.eventKey} action={true} href={pane.eventKey}>
                {pane.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col xs={8}>
          <TabContent>
            {panes.map(pane => (
              <TabPane key={pane.eventKey} eventKey={pane.eventKey}>
                {pane.component}
              </TabPane>
            ))}
          </TabContent>
        </Col>
      </Row>
    </TabContainer>
  </Layout>
);
