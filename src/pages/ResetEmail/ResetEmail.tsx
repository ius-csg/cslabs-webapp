import * as React from 'react'
import {Component, FormEvent} from 'react';
import {Button, Container, FormControlProps, Row, Col} from 'react-bootstrap';

export default class ResetEmail extends Component {

  onEmailChange = (event: FormEvent<FormControlProps>) => {
    this.setState({schoolEmail: event.currentTarget.value});
  };

  render() {
    return (
      <Container>
        <h2>Email Management</h2>
        <Row>
          <Col xs={{span: 12, order: 2}} md={{span: 8, order: 1}}>
            <input type='text' placeholder=' enter new email' onChange={e => this.setState({password: e.target.value})} />
          </Col>
        </Row>
        <Row>
          <Col xs={{span: 12, order: 2}} md={{span: 8, order: 1}}>
            <Button variant='primary' type='submit'>Reset Email</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
