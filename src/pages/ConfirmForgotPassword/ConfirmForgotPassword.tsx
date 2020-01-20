import * as React from 'react';
import {Component, FormEvent} from 'react';
import {Button, FormControlProps, Form, Col} from 'react-bootstrap';
import styles from './ConfirmForgotPassword.module.scss';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';
import PasswordStrength from '../../components/AccountManagementLayout/PasswordStrength';
import {RouteComponentProps} from 'react-router';

type Props = RouteComponentProps<{passwordRecoveryCode: string}>;

export default class ConfirmForgotPassword extends Component<Props> {

  state = {
    password: '',
    confirmPass: ''
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

  onSubmit = async (e: any) => {
    e.preventDefault();
    const code = this.props.match.params.passwordRecoveryCode;
    console.log(code);
    // await forgotPassword(this.state.email);
  };

  render() {
    return (
      <AccountManagementLayout>
        <h2>Password Recovery</h2>
        <Form onSubmit={this.onSubmit}>
          <Col sm='6'>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label column={true}>New Password</Form.Label>
              <Form.Control
               type='password'
               value={this.state.password}
               onChange={this.onPasswordChange}
               placeholder='Enter New Password'
              />
              <PasswordStrength password={this.state.password}/>
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
              <Button className={styles['button']} variant='primary' type='submit'>Change Password</Button>
            </Form.Group>
          </Col>
        </Form>
      </AccountManagementLayout>
    );
  }
}
