import * as React from 'react';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';
import {connect} from 'react-redux';
import {WebState} from '../../redux/types/WebState';
import {getCurrentUser} from '../../redux/selectors/entities';
import {User} from '../../types/User';

interface ProfileProps {
  user: User;
}

const Profile = (props: ProfileProps) => (
  <AccountManagementLayout>
    <h2>{props.user.email}</h2>
    <ul style={{listStyleType: 'none'}}>
      {/*<li><Link to={RoutePaths.resetEmail}>Manage Email Addresses</Link></li>*/}
      {/*<li><Link to={RoutePaths.resetPassword}>Change Password</Link></li>*/}
      <li><Link to={RoutePaths.logout}>Log Out</Link></li>
    </ul>
  </AccountManagementLayout>
);

export default connect((state: WebState) => ({user: getCurrentUser(state) }))(Profile);
