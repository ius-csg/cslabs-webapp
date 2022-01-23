import {changeSubscription} from 'api';
import {AccountManagementLayout} from 'components/AccountManagementLayout/AccountManagementLayout';
import React from 'react';
import {Button} from 'react-bootstrap';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {setCurrentUser} from 'redux/actions/entities/currentUser';
import {getCurrentUser} from 'redux/selectors/entities';
import {WebState} from 'redux/types/WebState';
import {User} from 'types/User';

interface SubscriptionStatusProps extends ConnectedProps<typeof connector> {
  user: User;
}

const SubscriptionStatus = (props: SubscriptionStatusProps) => {

  async function onChangeSubscription() {
    await changeSubscription(!props.user.subscribed);
    const updatedUser = { ...props.user, subscribed: !props.user.subscribed };
    props.actions.setCurrentUser(updatedUser);
  }

  return (
    <AccountManagementLayout>
      <h2>Subscription Info</h2>
      <Button onClick={onChangeSubscription} className='mt-2'>
        {props.user.subscribed ? 'Unsubscribe from CSLabs' : 'Subscribe to CSLabs'}
      </Button>
      {!props.user.subscribed && <p className='mt-2'>Get latest updates from CSLabs to your email.</p>}
    </AccountManagementLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({ actions: bindActionCreators({ setCurrentUser: setCurrentUser }, dispatch) });
const mapStateToProps = (state: WebState) => ({ user: getCurrentUser(state) });

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(SubscriptionStatus);