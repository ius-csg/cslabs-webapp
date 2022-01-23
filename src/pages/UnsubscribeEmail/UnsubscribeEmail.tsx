import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {changeSubscription} from 'api';
import React, {useEffect, useState} from 'react';
import {Container} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {bindActionCreators, Dispatch} from 'redux';
import {setCurrentUser} from 'redux/actions/entities/currentUser';
import {getCurrentUser} from 'redux/selectors/entities';
import {WebState} from 'redux/types/WebState';
import {RoutePaths} from 'router/RoutePaths';

type ProfileProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

const UnsubscribeEmail = (props: ProfileProps) => {

  const [redirect, setRedirect] = useState(false);
    
  async function unsubscribe() {
    await changeSubscription(false);
    const updatedUser = { ...props.user, subscribed: false };
    props.actions.setCurrentUser(updatedUser);
  }

  useEffect(() => {
    unsubscribe();
    const timeout = setTimeout(() => setRedirect(true), 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container style={{ textAlign: 'center', marginTop: '3rem', lineHeight: 2 }}>
      {redirect && <Redirect to={RoutePaths.home} />}
      <FontAwesomeIcon icon={faEnvelope} size={'2x'} />
      <h2>You have unsubscribed</h2>
      <p>You will no longer receive emails from CSLabs about important updates</p>
      <hr />
      <p>You can resubscribe anytime in the <Link to={RoutePaths.profile}>Account Management</Link> page</p>
    </Container>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({ actions: bindActionCreators({ setCurrentUser: setCurrentUser }, dispatch) });
const mapStateToProps = (state: WebState) => ({ user: getCurrentUser(state) });

export default connect(mapStateToProps, mapDispatchToProps)(UnsubscribeEmail);