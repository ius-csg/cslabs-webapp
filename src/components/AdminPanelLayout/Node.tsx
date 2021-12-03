import React from 'react';
import styles from './Node.module.scss';
import {Layout} from '../../pages/Layout/Layout';

enum NodeStatus {
  Good,
  Issues,
  Maintenance,
  Offline
}

let status = NodeStatus.Good;

const Node = () => {
  if (status !== NodeStatus.Offline) {
    return (
      <Layout className={styles['node']}>
        <div>
          <h1>Node {}</h1>
          <h1>Status: {}</h1>
          <p>_____________________</p>
          <p>Current Deployed Labs: ##</p>
          <p>Average CPU Usage: ##</p>
          <p>Current CPU Usage: ##</p>
          <p>Average RAM Usage: ##</p>
          <p>Current RAM Usage: ##</p>
          <p>Scheduled Maintenance:</p>
          <p>   Drive 1: ##, Drive 2: ##</p>
          <p>Scheduled Maintenance: </p>
          <p>Uptime: ##</p>
        </div>
      </Layout>
    );
  }
  else {
    return (
      <div>
        <h2>Server Offline!</h2>
        <p>Last known ip is </p>
      </div>
    );
  }
};

export default Node;
