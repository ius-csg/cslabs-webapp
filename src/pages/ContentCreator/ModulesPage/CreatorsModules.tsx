import React from 'react';
import {Layout} from '../../Layout/Layout';
import styles from '../../NotFound/NotFound.module.scss';

const temp = () => (
  <Layout>
    <div className={styles['not-found']}>
      <label>Please be patience. This page is still under construction.</label>
    </div>
  </Layout>
);

export default temp;
