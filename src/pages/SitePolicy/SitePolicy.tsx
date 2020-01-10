import * as React from 'react';
import { Accordion, Card, Container } from 'react-bootstrap';
import styles from './SitePolicy.module.scss';
import {PrivacyPolicy} from './policies/PrivacyPolicy';
import {TermsOfUse} from './policies/TermsOfUse';
import {Disclaimer} from './policies/Disclaimer';
import {CookiePolicy} from './policies/CookiePolicy';
import {DisputeResolution} from './policies/DisputeResolution';
import {Layout} from '../Layout/Layout';

export default class SitePolicy extends React.Component {
  render() {
    return (
      <React.Fragment >
        <Layout>
          <Container>
          <h1 className={styles['headline']}>Site Policy</h1>
          <h5 className={styles['update']}>Last Updated: &nbsp; <i> January 6th, 2020 </i></h5>
          <Accordion>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='termsOfUse' className={styles['accordion_toggle_header']}>
                <h4> TERMS OF USE </h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='termsOfUse'>
                <Card.Body> <TermsOfUse/> </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='dispute' className={styles['accordion_toggle_header']}>
                <h4> DISPUTE RESOLUTION</h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='dispute'>
                <Card.Body> <DisputeResolution/> </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='privacyPolicy' className={styles['accordion_toggle_header']}>
               <h4> PRIVACY POLICY </h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='privacyPolicy'>
                <Card.Body> <PrivacyPolicy /></Card.Body>
              </Accordion.Collapse>
             </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='cookiePolicy' className={styles['accordion_toggle_header']}>
               <h4> COOKIE POLICY </h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='cookiePolicy'>
                <Card.Body> <CookiePolicy/> </Card.Body>
              </Accordion.Collapse>
            </Card>
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey='disclaimer' className={styles['accordion_toggle_header']}>
              <h4> DISCLAIMER </h4>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='disclaimer'>
                <Card.Body> <Disclaimer/> </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
            <div className={styles['contact']}> In order to resolve any complaint regarding the Site, or our policies,
              please contact us at our contact us page here.
            </div>
          </Container>
        </Layout>
      </React.Fragment>
    );
  }
}
