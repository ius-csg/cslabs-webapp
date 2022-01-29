import React from 'react';
import {changeNewsletterSubscription} from 'api';
import {AccountManagementLayout} from 'components/AccountManagementLayout/AccountManagementLayout';
import {Button} from 'react-bootstrap';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {setCurrentUser} from 'redux/actions/entities/currentUser';
import {getCurrentUser} from 'redux/selectors/entities';
import {WebState} from 'redux/types/WebState';
import {User} from 'types/User';

interface NewsletterStatusOptions extends ConnectedProps<typeof connector> {
  user: User;
}

const NewsletterStatus = (props: NewsletterStatusOptions) => {

  async function onChangeSubscription() {
    await changeNewsletterSubscription(!props.user.subscribed);
    const updatedUser = { ...props.user, subscribed: !props.user.subscribed };
    props.actions.setCurrentUser(updatedUser);
  }

  return (
    <AccountManagementLayout>
      <h2>Newsletter Info</h2>
      <Button onClick={onChangeSubscription} className='mt-2'>
        {props.user.subscribed ? 'Unsubscribe' : 'Subscribe'}
      </Button>
      {!props.user.subscribed && <p className='mt-2'><strong>Subscribe</strong> to our newsletter to get latest updates
        from CSLabs to your email. This may include infrastructure updates, new changes, or any related information.</p>}
    </AccountManagementLayout>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({ actions: bindActionCreators({ setCurrentUser: setCurrentUser }, dispatch) });
const mapStateToProps = (state: WebState) => ({ user: getCurrentUser(state) });

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(NewsletterStatus);