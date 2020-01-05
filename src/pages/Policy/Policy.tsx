
import * as React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import {CssBaseline} from '@material-ui/core';
import {Container} from '@material-ui/core';

export default class ReactApp extends React.Component {
  content0() {
    return (
      <div>
      Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services.
    </div>
    );
  }
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth='sm'>
          <div>Site Policy</div>
          <Accordion defaultActiveKey='0'>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='0'>
                Click me!
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <Card.Body>Hello! I'm the body</Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='1'>
                Click me!
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='1'>
                <Card.Body>Hello! I'm another body</Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </React.Fragment>
    );
  }
}

{/* <PanelGroup accordion={true} defaultActiveKey={1} bordered={true} className={styles['test']}>
        <Panel header={'panel1'} eventKey={1}>
          <div className={styles['not-found']}>this.content1</div>
        </Panel>
        <Panel header={'panel2'} eventKey={2}>
          <div className={styles['not-found']}>this.content2</div>
        </Panel>
      </PanelGroup>
      */}
