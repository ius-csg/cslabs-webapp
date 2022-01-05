import React from 'react';
import {Button} from 'react-bootstrap';
import {Layout} from '../../pages/Layout/Layout';
import styles from './ClusterPane.module.scss';
import Node from './Node';

export const ClusterPane = () => (
  <Layout>
    <div className={styles['cluster-pane']}>
      <Button>Set Maintenance Mode</Button>
      <Button>Remove Node</Button>
      <Button>Add Node</Button>
      <p>------------------- CLUSTER NAME -------------------</p>
    </div>
    <Node nodeNum={1} statusNum={0}/>
  </Layout>
);
