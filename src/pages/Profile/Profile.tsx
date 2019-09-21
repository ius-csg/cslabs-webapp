import * as React from 'react';
import styles from './Profile.module.scss';
import {AccountManagementLayout} from '../../components/AccountManagementLayout/AccountManagementLayout';

const Profile = () => (
  <AccountManagementLayout>
    <h2>email@email.com</h2>
    <ul className={styles['links']}>
      <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Configure Lab Settings</a></li>
      <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Manage Course Subscriptions</a></li>
      <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Manage Email Addresses</a></li>
      <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Change Password</a></li>
      <li><a href='https://apps.ius.edu/profile/images/24-1563997501_thumb.jpg'>Log Out</a></li>
    </ul>
  </AccountManagementLayout>
);

export default Profile;
