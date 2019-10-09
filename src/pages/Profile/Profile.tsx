import * as React from 'react';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';
import {Link} from 'react-router-dom';
import {RoutePaths} from '../../router/RoutePaths';

const Profile = () => (
  <AccountManagementLayout>
    <h2>email@email.com</h2>
    <ul style={{listStyleType: 'none'}}>
      <li><Link to={RoutePaths.resetEmail}>Manage Email Addresses</Link></li>
      <li><Link to={RoutePaths.resetPassword}>Change Password</Link></li>
      <li><Link to='/logout'>Log Out</Link></li>
    </ul>
  </AccountManagementLayout>
);

export default Profile;
