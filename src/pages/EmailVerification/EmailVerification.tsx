import * as React from 'react';
import {useState} from 'react';
import styles from './EmailVerification.module.scss';
import {Button, Spinner} from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import {resendEmailVerification, verifyUser} from '../../api';
import {RiCheckboxCircleFill, RiCloseCircleFill} from 'react-icons/all';
import {useMount} from '../../hooks/useMount';
import {RoutePaths} from '../../router/RoutePaths';
import {DelayedRedirect} from '../../util/DelayedRedirect';
import {usePerformRequest} from '../../util/usePerformRequest';
import {bindActionCreators, Dispatch} from 'redux';
import {setUserVerified} from '../../redux/actions/entities/currentUser';
import {connect} from 'react-redux';

type EmailVerificationProps = ReturnType<typeof mapDispatchToProps>;

const EmailVerification = ({actions}: EmailVerificationProps) => {

  const [sent, setSent] = useState(false);
  const [verified, setVerified] = useState();
  const {loading, error, performRequest} = usePerformRequest();

  const handleClick = async () => await performRequest(async () => setSent(await resendEmailVerification()));
  const checkVerified = async () => {
    await performRequest(async () => {
      const verifiedResponse = await verifyUser() ?? false;
      actions.setUserVerified(verifiedResponse);
      setVerified(verifiedResponse);
    });
  };
  useMount(checkVerified);

  return (
    <Layout isEmailVerificationPage={true}>
      {
        !(loading && !error) ? <div className={styles['email-verification']}>
          <p className={styles['title']}>
            {error
              ? <RiCloseCircleFill className={styles['error']}/>
              : !verified && sent && <RiCheckboxCircleFill className={styles['check']}/>}
            {error
              ? 'There was an error sending a verification email to your account.' :
              verified
                ? 'You\'re account has been verified and will be redirected shortly.'
                : !sent ? 'Your account has not been verified.' : 'A verification link has been sent to your email.'}
          </p>
          {!(verified && !error) ? <>
            <p className={styles['paragraph']}>
              {error
                ? 'Please verify that your account has the correct email address.'
                : sent
                  ? `Please go to your email account and click on the link that has
                    just been sent to you to verify your account`
                  : `To verify your account please, click the button below to send a
                    verification email to your account. `}
            </p>
            {!verified && !sent && <Button onClick={handleClick}>Send another verification email</Button>}
            {!verified && sent && <Button onClick={checkVerified}>Check again</Button>}
          </> : <DelayedRedirect path={RoutePaths.explore} delay={2000}/>
          }
        </div> : <div className={styles['spinner']}>
          <Spinner
            animation='border'
            role='status'
            variant={'dark'}
          />
          <span> Loading...</span>
        </div>
      }
    </ Layout>);
};


const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({setUserVerified: setUserVerified}, dispatch)
});

export default connect(undefined, mapDispatchToProps)(EmailVerification);
