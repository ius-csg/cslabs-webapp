import React from 'react';
import styles from './Node.module.scss';
import {Button, Card} from 'react-bootstrap';

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
  deployedNum: number;
  avgCPU: number;
  currentCPU: number;
  avgRAM: number;
  currentRAM: number;
  drive1: number;
  drive2: number;
  uptime: number;
}

const Node = (props: NodeProps) => {
  if (props.statusNum !== NodeStatus.Offline) {
    return (
      <Card style={{width: '20rem'}}>
        <Card.Header className={styles['node']}>
          Status:
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
        </Card.Header>
        <Card.Body>
            <Card.Title>Node {props.nodeNum}
            </Card.Title>
          <Card.Text style={{textAlign: 'left'}}>
            Current Deployed Labs: {props.deployedNum}
            <br/>Average CPU Usage: {props.avgCPU}%
            <br/>Current CPU Usage: {props.currentCPU}%
            <br/>Average RAM Usage: {props.avgRAM}
            <br/>Current RAM Usage: {props.currentRAM}
            <br/>Storage:
            <br/>Drive 1: {props.drive1}, Drive 2: {props.drive2}
            <br/>Scheduled Maintenance:
            <br/>Uptime: {props.uptime}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
  else {
    return (
      <Card style={{ width: '20rem' }}>
        <Card.Header className={styles['node']}>Status:
          <span id={styles['offline']}/>
        </Card.Header>
          <Card.Body>
            <Card.Title>Node {props.nodeNum} Status:
              <span id={styles['offline']}/>
            </Card.Title>
            <Card.Text>
              Server Offline!<br/>Last known ip is
            </Card.Text>
            <Button>edit</Button>
          </Card.Body>
      </Card>
    );
  }
};

export default Node;
