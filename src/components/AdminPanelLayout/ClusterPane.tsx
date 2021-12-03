import React from 'react';
import {Button} from 'react-bootstrap';
import {Layout} from '../../pages/Layout/Layout';
import styles from './ClusterPane.module.scss';

export const ClusterPane = () => (
  <Layout>
    <div className={styles['cluster-pane']}>
      <Button>Set Maintenance Mode</Button>
      <Button>Remove Node</Button>
      <Button>Add Node</Button>
      <p>------------------- &lt;Cluster Name&gt; -------------------</p>
    </div>
  </Layout>
);
