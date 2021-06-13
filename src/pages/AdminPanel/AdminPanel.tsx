import {Layout} from '../Layout/Layout';
import styles from './AdminPanel.scss';
import React from 'react';
import {AdminPanelLayout} from '../../components/AdminPanelLayout/AdminPanelLayout';

const AdminPage = () => (
  <Layout>
    <div className={styles['not-found']}>
      <label>This page is still under construction.</label>
      <AdminPanelLayout/>
    </div>
  </Layout>
);

export default AdminPage;
