import * as React from 'react';
import {useState} from 'react';
import styles from './EmailVerification.module.scss';
import {Button, Spinner} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import {resendEmail, verifyUser} from '../../api';
import {RiCheckboxCircleFill, RiCloseCircleFill} from 'react-icons/all';
import {useMount} from '../../hooks/useMount';

function EmailVerification() {

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [verified, setVerified] = useState();

  const handleClick = async () => {
    try {
      // tslint:disable-next-line:no-console
      console.log('handle');
      setSending(true);

      const result = await resendEmail();
      setSending(false);
      setSent(result);
      setError(false);

    } catch {
      setSending(false);
      setError(true);
    }
  };

  useMount(async () => {
    const verifyUserReturn = await verifyUser();
    if (verifyUserReturn) {
      setVerified(verifyUserReturn);
    } else {
      setVerified(false);
    }
  });

  const renderNewEmailVerification = () => {
    if (error) {
      return (
        <div className={styles['email-verification']}>
          <p className={styles['title']}>
            <RiCloseCircleFill className={styles['error']}/>
            There was an error sending a verification email to your account.
          </p>
          <p className={styles['paragraph']}>
            Please verify that your account has the correct email address.</p>
        </div>
      );
    }
    if (sending) {
      return (
        <div className={styles['spinner']}>
          <Spinner
            animation='border'
            role='status'
            variant={'dark'}
          />
          <span> Loading...</span>
        </div>
      );
    }
    if (verified) {
      // Need to be redirected back to explore page because it has been verified
      // Reference for script https://stackoverflow.com/questions/3292038/redirect-website-after-specified-amount-of-time
      return (
        <div className={styles['email-verification']}>
          <p className={styles['title']}>
            You're account has been verified and will be directed shortly.
          </p>
          <script>
            delay = (2000) => {
            // tslint:disable-next-line:jsx-curly-spacing
            window.location.href = `/explore`
          }
          </script>
        </div>
      );
    }
    if (sent) {
      return (
        <div className={styles['email-verification']}>
          <p className={styles['title']}>
            <RiCheckboxCircleFill className={styles['check']}/>
            A verification link has been sent to your email.
          </p>
          <p className={styles['paragraph']}>
            Please go to your email account and click on the link that has
            just been sent to you to verify your account</p>
        </div>
      );
    }
    return (
      <div className={styles['email-verification']}>
        <p className={styles['title']}>
          Your account has not been verified.
        </p>
        <p className={styles['paragraph']}>
          To verify your account please, click the button below to send a
          verification email to your account. </p>
        <Button onClick={() => handleClick()}>Send another verification email</Button>
      </div>
    );
  };

  return (
    <Layout isEmailVerificationPage={true}>
    {renderNewEmailVerification()}
  </ Layout>);
}

export default EmailVerification;
