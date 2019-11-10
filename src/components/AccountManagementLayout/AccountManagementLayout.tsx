import {Col, Row} from 'react-bootstrap';
import * as React from 'react';
import {Layout} from '../../pages/Layout/Layout';

interface AccountManagementLayoutProps {
  children: any;
}

export const AccountManagementLayout = (props: AccountManagementLayoutProps) => (
  <Layout>
    <h1>Account Management</h1>
    <Row>
      <Col xs={{span: 12, order: 2}} md={{span: 8, order: 1}}>
        {props.children}
      </Col>
      <Col xs={{span: 6, order: 1}} md={{span: 4, order: 2}}/>
    </Row>
  </Layout>
);
