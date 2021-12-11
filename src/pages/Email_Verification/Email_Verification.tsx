import * as React from 'react';
import styles from './Email_Verification.module.scss';
import {RiCheckboxCircleFill} from 'react-icons/ri';
import {Button} from 'react-bootstrap';
import {WebState} from '../../redux/types/WebState';
import {isAuthenticated} from '../../redux/selectors/entities';
import {connect} from 'react-redux';
import {NavItem} from '../../components/NavigationBar/NavItem';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {Layout} from '../Layout/Layout';


// Add props to layout to disable links

function emailSent() {
  alert('Email Sent');
}

const emailVerification =
  ({authenticated}: ReturnType<typeof mapStateToProps>) =>
    <Layout navigation={false}>
      <div className={styles['email-verification']}>
      {authenticated ? <NavItem label='My Modules' link='/my-modules' icon={faList}/> : null}
      <p className={styles['title']}>
        <RiCheckboxCircleFill className={styles['check']}/>
        A verification link has been sent to your email
      </p>
      <p className={styles['paragraph']}>
        Please go to your email account and click on the link that has just been sent to you to verify your account.</p>
      <Button onClick={emailSent}>Send another verification email</Button>
    </div>
    </ Layout>;

const mapStateToProps = (state: WebState) => ({authenticated: isAuthenticated(state)});

export const EmailVerification = connect(mapStateToProps)(emailVerification);
