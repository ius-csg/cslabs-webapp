import * as React from 'react';
import {Component} from 'react';
import styles from './Email_Verification.module.scss';
import {Button} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import {resendEmail, verifyUser} from '../../api';
import {RiCheckboxCircleFill, RiCloseCircleFill} from 'react-icons/all';


interface EmailState {
  sending: boolean;
  verified?: boolean;
  error: boolean;
}

export class EmailVerification extends Component <EmailState> {

  state: EmailState = {
    sending: false,
    error: false
  };

  async handleClick() {
    await resendEmail();
    try {
      this.setState({
        sending: true,
        error: false
      });
    } catch {
      this.setState({
        sending: false,
        error: true
      });
    }

  }

  async componentDidMount() {
    const verifyUserReturn = await verifyUser();
    // tslint:disable-next-line:no-console
    console.log(verifyUserReturn);

    try {
      this.setState({
        verified: verifyUserReturn
      });
    } catch {
      this.setState({
        verified: false
      });
    }

  }

  renderNewEmailVerification() {
    if (this.state.error) {
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

    if (this.state.sending) {
      return (
        <div className={styles['lds-facebook']}>
          <div/>
          <div/>
          <div/>
        </div>
      );
    }

    if (this.state.verified) {
      // Need to be redirected back to explore page because it has been verified
      return (
        <div className={styles['email-verification']}>
          <p className={styles['title']}>
            You're account has been verified and will be directed shortly.
          </p>
        </div>
      );
    }

    if (!this.state.error && this.state.sending) {
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
        <Button onClick={this.handleClick}>Send another verification email</Button>
      </div>
    );
  }

  render() {
    return <Layout>
      {this.renderNewEmailVerification()}
    </ Layout>;
  }
}

