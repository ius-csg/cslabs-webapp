import * as React from 'react';
import styles from './NotFound.module.scss';
import {Layout} from '../Layout/Layout';

const 503Page = () => (
  <Layout>
    <div className={styles['not-found']}>
      <label>404</label>
    </div>
  </Layout>
);

export default NotFound;
