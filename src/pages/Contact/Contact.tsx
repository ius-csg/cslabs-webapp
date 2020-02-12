import * as React from 'react';
import {Component, FormEvent} from 'react';
import {Button, Form, Col} from 'react-bootstrap';
import styles from '../ResetPassword/ResetPassword.module.scss';
import { Layout } from 'pages/Layout/Layout';

export default class ResetEmail extends Component {
  state = {
    email: '',
    message: '',
    file: ''
  };

  onEmailChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({email: event.currentTarget.value});
  };
  onMessageChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({message: event.currentTarget.value});
  };
  onFileChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({file: event.currentTarget.value});
  };
  render() {
    return (
      <Layout>
        <h1>Contact Us</h1>
        <Form>
          <Col sm='6'>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label column={true}>Email</Form.Label>
              <Form.Control
                type='email'
                value={this.state.email}
                onChange={this.onEmailChange}
                placeholder='Enter Email'
              />
            </Form.Group>
            <Form.Group controlId='formBasicFile'>
              <Form.Label column={true}>Screenshot (images files only)</Form.Label>
              <Form.Control
                type='file'
                accept='image/*'
                value={this.state.file}
                onChange={this.onFileChange}
                placeholder='Enter New Email'
              />
            </Form.Group>
            <text>
              If this was a bug report, please tell us what you were attempting to do, what happened, and what was supposed to happen.
            </text>
            <Form.Group controlId='formBasicCurrentPassword'>
              <Form.Label column={true}>Message</Form.Label>
              <Form.Control
                type='text'
                value={this.state.message}
                placeholder=''
                onChange={this.onMessageChange}
              />
            </Form.Group>
            <Button className={styles['button']} variant='primary' type='submit'>Submit</Button>
          </Col>
        </Form>
      </Layout>

    );
  }
}

