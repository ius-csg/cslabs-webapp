import {Col, ListGroup, Row, Tab} from 'react-bootstrap';
import React from 'react';
import {Layout} from '../../pages/Layout/Layout';
import {RoutePaths} from 'router/RoutePaths';

interface AccountManagementLayoutProps {
  children: any;
}

const accountManagementOptions = [
  {label: 'Profile', pageLink: RoutePaths.profile},
  {label: 'Change Password', pageLink: RoutePaths.resetPassword},
  {label: 'Subscription Status', pageLink: RoutePaths.subscriptionStatus}
];

export const AccountManagementLayout = (props: AccountManagementLayoutProps) => (
  <Layout>
    <h1>Account Management</h1>
    <Tab.Container id='user-account-management' activeKey={window.location.pathname}>
      <Row style={{marginTop: '1.5rem'}}>
        <Col sm={4}>
          <ListGroup>
            {accountManagementOptions.map(option => (
              <ListGroup.Item action={true} href={option.pageLink} key={option.pageLink}>
                {option.label}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            {accountManagementOptions.map(option => (
              <Tab.Pane eventKey={option.pageLink} key={option.pageLink}>  
                {props.children}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  </Layout>
);
