import * as React from 'react';
import {Layout} from '../Layout/Layout';

const styles = {
  h1: {
    fontSize: '100px'
  },
  h2: {
    fontSize: '75px',
    paddingBottom: '30px'
  },
  body: {
    fontSize: '20px',
    paddingBottom: '400px'
  },
  p: {
    fontSize: '15px'
  }
};

const ServiceUnavailable = () => (
  <Layout>
    <div>
      <h1 style={styles.h1}>503</h1>
      <h2 style={styles.h2}>Service Unavailable</h2>
      <body style={styles.body}>Sorry, our servers are unavailable at the moment. We are actively working to get
      them back up as soon as possible</body>
      <p style={styles.p}>Somebody ping Adam and tell him to go kick the servers</p>
    </div>
  </Layout>
);

export default ServiceUnavailable;


