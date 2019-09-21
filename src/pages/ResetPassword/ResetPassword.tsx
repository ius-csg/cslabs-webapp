import * as React from 'react'
import {Component, FormEvent} from 'react';
import {Button, Container, FormControlProps, Form, Col} from 'react-bootstrap';
import styles from './ResetPassword.module.scss';
export default class ResetPassword extends Component {

  state = {
    currentPass: '',
    password: '',
    confirmPass: ''
  };
  onCurrentPasswordChange = (event: FormEvent<FormControlProps>) => {
    this.setState({currentPass: event.currentTarget.value});
  };
  onPasswordChange = (event: FormEvent<FormControlProps>) => {
    this.setState({password: event.currentTarget.value});
  };
  onConfirmPassChange = (event: FormEvent<FormControlProps>) => {
    this.setState({confirmPass: event.currentTarget.value});
  };
  isPassInvalid = () => {
    return this.state.password !== this.state.confirmPass;
  };
  render() {
    return (
      <Container>
        <h1>Reset Password</h1>
        <Form>
          <Col sm='6'>
            <Form.Group controlId='formBasicCurrentPassword'>
              <Form.Label column={true}>Current Password</Form.Label>
              <Form.Control
               type='password'
               value={this.state.currentPass}
               onChange={this.onCurrentPasswordChange}
               placeholder='Enter Current Password'
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label column={true}>New Password</Form.Label>
              <Form.Control
               type='password'
               value={this.state.password}
               onChange={this.onPasswordChange}
               placeholder='Enter New Password'
              />
            </Form.Group>
            <Form.Group controlId='formBasicConfirmPassword'>
              <Form.Label column={true}>Confirm Password</Form.Label>
              <Form.Control
                isInvalid={this.isPassInvalid()}
                type='password'
                value={this.state.confirmPass}
                onChange={this.onConfirmPassChange}
                placeholder='Confirm New Password'
              />
              <Form.Control.Feedback type='invalid'>
                The password did not match, please try again.
              </Form.Control.Feedback>
              <Button className={styles['button']} variant='primary' type='submit'>Register</Button>
            </Form.Group>
          </Col>
        </Form>
      </Container>
    );
  }
}
