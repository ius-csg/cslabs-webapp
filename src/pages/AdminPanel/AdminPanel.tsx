import {Layout} from '../Layout/Layout';
import styles from 'AdminPanel.scss';
import React from 'react';

const AdminPanel = () => (
  <Layout>
    <div className={styles['not-found']}>
      <label>This page is still under construction.</label>
    </div>
  </Layout>
);

export default AdminPanel;
