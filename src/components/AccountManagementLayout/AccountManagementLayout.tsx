import {Col, ListGroup, Row, Tab} from 'react-bootstrap';
import React from 'react';
import {Layout} from '../../pages/Layout/Layout';
import {RoutePaths} from 'router/RoutePaths';
import {faUser, faKey, faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {matchPath} from 'react-router';
import { useHistory } from 'react-router-dom';

interface AccountManagementLayoutProps {
  children: any;
}

const accountManagementOptions = [
  {label: 'Profile', pageLink: RoutePaths.profile, icon: faUser},
  {label: 'Change Password', pageLink: RoutePaths.resetPassword, icon: faKey},
  {label: 'Newsletter Status', pageLink: RoutePaths.newsletterStatus, icon: faNewspaper}
];
const getActiveKey = (url: string) => getFirstItem(accountManagementOptions.map(o => o.pageLink), o => matchPath(url, o) !== null);

function getFirstItem<T>(items: T[], filter: (i: T) => boolean) {
  const filtered = items.filter(filter);
  if(filtered.length > 0)
    return filtered[0];
  return undefined;
}

export function AccountManagementLayout(props: AccountManagementLayoutProps) {
  const history = useHistory();
  return (
    <Layout>
      <h1>Account Management</h1>
      <Tab.Container id='user-account-management' activeKey={getActiveKey(window.location.pathname)}>
        <Row style={{marginTop: '1.5rem'}}>
          <Col sm={4}>
            <ListGroup>
              {accountManagementOptions.map(option => (
                <ListGroup.Item action={true}  onClick={() => history.push(option.pageLink)} key={option.pageLink}>
                  <FontAwesomeIcon icon={option.icon} className='mr-3' />
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
}

