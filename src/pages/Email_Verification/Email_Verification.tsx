import * as React from 'react';
import styles from './Email_Verification.module.scss';
import {Layout} from '../Layout/Layout';
import {RiCheckboxCircleFill} from 'react-icons/ri';
import {Button} from 'react-bootstrap';


// Add props to layout to disable links

function emailSent() {
  alert('Email Sent');
}

const emailVerification = () => (
  <Layout>
      <div className={styles['email-verification']}>
      <p className={styles['title']}>
        <RiCheckboxCircleFill className={styles['check']}/>
        A verification link has been sent to your email
      </p>
      <p className={styles['paragraph']}>
        Please go to your email account and click on the link that has just been sent to you to verify your account.</p>
      <Button onClick={emailSent}>Send another verification email</Button>
    </div>
  </Layout>
);

export default emailVerification;
