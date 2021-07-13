import * as React from 'react';
import {Layout} from '../Layout/Layout';
import styles from './ServiceUnavailable.module.scss';
import image from '../../assets/images/broken_server.png'


const ServiceUnavailable = () => (
  <Layout>
    <div className={styles['number-code']}>
      <img src={image} alt={'broken_server.png'}/>
      <h1>503</h1>
      <h2>Service Unavailable</h2>
      <body>Sorry, our servers are unavailable at the moment. We are actively working to get
      them back up as soon as possible</body>
      <p>Somebody ping Dr. Doyle and tell him to go kick the servers</p>
    </div>
  </Layout>
);

export default ServiceUnavailable;

