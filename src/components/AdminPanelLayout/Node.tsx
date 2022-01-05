import React from 'react';
import styles from './Node.module.scss';
import {Layout} from '../../pages/Layout/Layout';
import {Button} from 'react-bootstrap';

// 0 is green, 1 is yellow, 2 is black, 4 is red
enum NodeStatus {
  Good,
  Issues,
  Maintenance,
  Offline
}

// number for what node, number for status
interface NodeProps {
  nodeNum: number;
  statusNum: NodeStatus;
}

const Node = (props: NodeProps) => {
  if (props.statusNum !== NodeStatus.Offline) {
    return (
      <Layout className={styles['node']}>
        <div>
          <h1>Node {props.nodeNum}</h1>
          <h1>Status:</h1>
          {props.statusNum === NodeStatus.Good &&
              <span id={styles['good']}/>
          }
          {props.statusNum === NodeStatus.Issues &&
            <div id={styles['wrapper']}>
              <span id={styles['issues']}/>
              <Button>Current Issues</Button>
            </div>
          }
          {props.statusNum === NodeStatus.Maintenance &&
              <span id={styles['maintenance']}/>
          }
          <p>__________________________________</p>
          <p>Current Deployed Labs: ##</p>
          <p>Average CPU Usage: ##</p>
          <p>Current CPU Usage: ##</p>
          <p>Average RAM Usage: ##</p>
          <p>Current RAM Usage: ##</p>
          <p>Scheduled Maintenance:</p>
          <p>   Drive 1: ##, Drive 2: ##</p>
          <p>Scheduled Maintenance: </p>
          <Button>edit</Button>
          <p>Uptime: ##</p>
        </div>
      </Layout>
    );
  }
  else {
    return (
      <Layout className={styles['node']}>
        <div>
          <h1>Node {props.nodeNum}</h1>
          <h1>Status:</h1>
          <span id={styles['maintenance']}/>
          <h2>Server Offline!</h2>
          <h2>Last known ip is </h2>
        </div>
      </Layout>
    );
  }
};

export default Node;
