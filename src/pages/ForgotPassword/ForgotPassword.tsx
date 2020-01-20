import * as React from 'react';
import {Component, FormEvent} from 'react';
import {Button, FormControlProps, Form, Col, Alert} from 'react-bootstrap';
import styles from './ForgotPassword.module.scss';
import {forgotPassword} from '../../api';
import {Layout} from '../Layout/Layout';

export default class ForgotPassword extends Component {

  state = {
    email: '',
    successMessage: '',
    errorMessage: ''
  };

  onEmailChange = (event: FormEvent<FormControlProps>) => {
    this.setState({email: event.currentTarget.value});
  };

  onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await forgotPassword(this.state.email);
      this.setState({successMessage: 'If your email exists, a confirmation was sent to your inbox!', errorMessage: undefined});
    } catch (e) {
      this.setState({errorMessage: 'An Error occurred, try again later'});
    }

  };

  render() {
    return (
      <Layout>
        <Form onSubmit={this.onSubmit}>
          <Col sm='6' style={{margin: 'auto'}}>
            <h2>Password Recovery</h2>
            <Form.Group controlId='formBasicCurrentPassword'>
              <Form.Label column={true}>Email</Form.Label>
              <Form.Control
                value={this.state.email}
                onChange={this.onEmailChange}
                placeholder='Enter Your Email'
              />
            </Form.Group>
            <Button className={styles['button']} variant='primary' type='submit'>Send Confirmation</Button>
            <div style={{marginTop: '1rem'}}>
            {this.state.successMessage ? <Alert variant='success'>{this.state.successMessage}</Alert> : null}
            {this.state.errorMessage ? <Alert variant='danger'>{this.state.errorMessage}</Alert> : null}
            </div>
          </Col>
        </Form>
      </Layout>
    );
  }
}
