import * as React from 'react';
import { Accordion, Card, Container } from 'react-bootstrap';
import styles from './SitePolicy.module.scss';
import {PrivacyPolicy} from './policies/PrivacyPolicy';
import {TermsOfUse} from './policies/TermsOfUse';
import {Disclaimer} from './policies/Disclaimer';
import {CookiePolicy} from './policies/CookiePolicy';

export default class SitePolicy extends React.Component {
  render() {
    return (
      <React.Fragment >
          <Container>
          <h1 className={styles['headline']}>Site Policy</h1>
          <h5 className={styles['update']}>Last Updated: &nbsp; <i> January 6th, 2020 </i></h5>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='termsOfUse' >
                <h4> TERMS OF USE </h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='termsOfUse'>
                <Card.Body> <TermsOfUse/> </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='privacyPolicy'>
               <h4> PRIVACY POLICY </h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='privacyPolicy'>
                <Card.Body> <PrivacyPolicy /></Card.Body>
              </Accordion.Collapse>
             </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='cookiePolicy'>
               <h4> COOKIE POLICY </h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='cookiePolicy'>
                <Card.Body> <CookiePolicy/> </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='disclaimer'>
              <h4> DISCLAIMER </h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='disclaimer'>
                <Card.Body> <Disclaimer/> </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
          <div className={styles['contact']}> In order to resolve any complaint regarding the Site, or our policies,
            please contact us at our contact us page here.</div>
        </Container>
      </React.Fragment>
    );
  }
}
