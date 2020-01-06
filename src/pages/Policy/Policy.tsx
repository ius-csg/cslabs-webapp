
import * as React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import {CssBaseline} from '@material-ui/core';
import {Container} from '@material-ui/core';
import styles from './Policy.module.scss';

export default class ReactApp extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth='sm'>
          <h1 className={styles['headline']}>Site Policy</h1>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                TERMS OF USE
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body> <div>test</div> </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='1'>
                PRIVACY POLICY
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
             </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='2'>
                COOKIE POLICY
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='2'>
                <Card.Body>this.content0()</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='3'>
                DISCLAIMER
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='3'>
                <Card.Body>this.content0()</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <div> In order to resolve any complaint regarding the Site, or our policies,
            please contact us at our contact us page.</div>
        </Container>
      </React.Fragment>
    );
  }
}
