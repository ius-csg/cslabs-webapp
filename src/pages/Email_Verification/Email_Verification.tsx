import * as React from 'react';
import styles from './Email_Verification.scss';
import {Layout} from '../Layout/Layout';


const emailVerification = () => (// add verification instead of valid, remove page and reminder
  <Layout>
    <div className={styles['email_verification_reminder']}>
      <label>200</label>
    </div>
  </Layout>
);

export default emailVerification;
