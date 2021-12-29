import * as React from 'react';
import {Component} from 'react';
import styles from './Email_Verification.module.scss';
import {Button} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import {resendEmail, verifyUser} from '../../api';
import {RiCheckboxCircleFill, RiCloseCircleFill} from 'react-icons/all';


interface EmailState {
  loading: boolean;
  verified?: boolean;
  error: boolean;
}

export class EmailVerification extends Component <EmailState> {

  state: EmailState = {
    loading: true,
    error: false
  };

  async handleClick() {
    await resendEmail();
  }

  async componentDidMount() {
    const verifyUserReturn = await verifyUser();

    try {
      this.setState({
        loading: false,
        verified: verifyUserReturn,
        error: false
      });
    } catch {
      this.setState({
        loading: false,
        verified: false,
        error: true
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
    if (this.state.loading) {
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
    if (!this.state.error) {
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
      return(
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

