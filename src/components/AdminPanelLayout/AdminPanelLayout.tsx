import React from 'react';
import {Layout} from '../../pages/Layout/Layout';
import {Col, ListGroup, Row, TabContainer, TabContent, TabPane} from 'react-bootstrap';
import {StatisticsPane} from './StatisticsPane';
import {ClusterPane} from './ClusterPane';
import UsersPane from './UsersPane';
import {DowntimeScheduler} from './DowntimeScheduler';
import {cast} from '../../util';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {getCurrentUser} from '../../redux/selectors/entities';
import {User} from '../../types/User';
import {Redirect} from 'react-router';
import {faChartBar, faNetworkWired, faUsers, faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface AdminPanelLayoutProps {
  defaultActivePanel?: AdminTabKeys;
  currentUser: User;
}

const panes = [
  {label: 'Application Statistics', eventKey: '#statistics', icon: faChartBar, component: <StatisticsPane/>},
  {label: 'Cluster Management', eventKey: '#cluster-management', icon: faNetworkWired, component: <ClusterPane/>},
  {label: 'User Management', eventKey: '#user-management', icon: faUsers, component: <UsersPane/>},
  {label: 'Downtime Scheduler', eventKey: '#downtime-scheduler', icon: faCalendarAlt, component: <DowntimeScheduler/>}
] as const;

type AdminTabKeys = typeof panes[number]['eventKey'];

const AdminPanelLayout = (props: AdminPanelLayoutProps) => {

  if (props.currentUser.role !== 'Admin') {
    return <Redirect to={'/'} />;
  } else {
    return <Layout>
      <h1>Admin Console</h1>
      <TabContainer
        defaultActiveKey={cast<AdminTabKeys>(props.defaultActivePanel ? props.defaultActivePanel : '#statistics')}
      >
        <Row>
          <Col xs={4}>
            <ListGroup style={{marginTop: '20px'}}>
              {panes.map(pane => (
                <ListGroup.Item key={pane.eventKey} action={true} href={pane.eventKey}>
                  <FontAwesomeIcon icon={pane.icon} className='mr-3' />
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
    </Layout>;
  }
};

export default connect((state: WebState) => ({currentUser: getCurrentUser(state)})) (AdminPanelLayout);
