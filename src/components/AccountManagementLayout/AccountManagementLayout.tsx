import {Col, Container, Image, Row} from 'react-bootstrap';
import * as React from 'react';

interface AccountManagementLayoutProps {
  children: any;
}

export const AccountManagementLayout = (props: AccountManagementLayoutProps) => (
  <Container>
    <h1>Account Management</h1>
    <Row>
      <Col xs={{span: 12, order: 2}} md={{span: 8, order: 1}}>
        {props.children}
      </Col>
      <Col xs={{span: 6, order: 1}} md={{span: 4, order: 2}}>
        <Image roundedCircle={true} src='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg' alt='profile'/>
      </Col>
    </Row>
  </Container>
);
