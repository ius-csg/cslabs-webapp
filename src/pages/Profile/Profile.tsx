import * as React from 'react';
import styles from './Profile.module.scss';
import {Container, Image, Col, Row} from 'react-bootstrap';

const Profile = () => (
  <Container>
    <h1>Account Management</h1>
    <Row>
      <Col xs={{span: 12, order: 2}} md={{span: 8, order: 1}}>
        <h2>email@email.com</h2>
        <ul className={styles['links']}>
          <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Configure Lab Settings</a></li>
          <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Manage Course Subscriptions</a></li>
          <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Manage Email Addresses</a></li>
          <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Change Password</a></li>
          <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Log Out</a></li>
        </ul>
      </Col>
      <Col xs={{span: 6, order: 1}} md={{span: 4, order: 2}}>
        <Image roundedCircle={true} src='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg' alt='profile'/>
      </Col>
    </Row>
  </Container>
);

export default Profile;
