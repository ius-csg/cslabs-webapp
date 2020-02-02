import * as React from 'react';
import {Component, FormEvent} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import styles from '../ResetPassword/ResetPassword.module.scss';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';

export default class ResetEmail extends Component {
  state = {
    email: '',
    currentPass: ''
  };

  onCurrentPasswordChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({currentPass: event.currentTarget.value});
  };

  onEmailChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({email: event.currentTarget.value});
  };

  render() {
    return (
      <AccountManagementLayout>
        <h2>Email Management</h2>
        <Form>
          <Col sm='6'>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label column={true}>New Email</Form.Label>
              <Form.Control
                type='email'
                value={this.state.email}
                onChange={this.onEmailChange}
                placeholder='Enter New Email'
              />
            </Form.Group>
            <Form.Group controlId='formBasicCurrentPassword'>
              <Form.Label column={true}>Current Password</Form.Label>
              <Form.Control
                type='password'
                value={this.state.currentPass}
                onChange={this.onCurrentPasswordChange}
                placeholder='Enter Current Password'
              />
            </Form.Group>
            <Button className={styles['button']} variant='primary' type='submit'>Change Email</Button>
          </Col>
        </Form>
      </AccountManagementLayout>
    );
  }
}

