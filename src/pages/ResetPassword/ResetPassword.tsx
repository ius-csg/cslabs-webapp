import * as React from 'react'
import {Component, FormEvent} from 'react';
import {Button, Container, FormControlProps, Row, Col} from 'react-bootstrap';

export default class ResetPassword extends Component {

  onPasswordChange = (event: FormEvent<FormControlProps>) => {
    this.setState({schoolEmail: event.currentTarget.value});
  };

  render() {
    return (
      <Container>
        <h2>Password Reset</h2>
        <Row>
          <Col xs={{span: 12, order: 2}} md={{span: 8, order: 1}}>
            <input type='password' placeholder=' enter new password' onChange={e => this.setState({password: e.target.value})} />
          </Col>
        </Row>
        <Row>
          <Col xs={{span: 12, order: 2}} md={{span: 8, order: 1}}>
            <Button variant='primary' type='submit'>Reset Password</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
