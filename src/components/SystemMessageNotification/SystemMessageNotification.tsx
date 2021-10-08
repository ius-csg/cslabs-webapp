import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './SystemMessageNotification.module.scss';


export function getSystemMessageType(type: string) {
  if (type === 'info') {
    return styles['info'];
  }
  else if (type === 'warning') {
  return styles['warning'];
  }
  else
    return styles['notice'];

}

export type SystemMessageNotificationTypes = 'info' | 'warning' | 'notice';

interface Props {
  onClick?: () => void;
  type: SystemMessageNotificationTypes;
  description: string;
}

export function SystemMessageNotification (props: Props) {

    const [show] = useState(true);

        return show ? (
          <div className={styles['alert-container']}>
             <Alert className={getSystemMessageType(props.type.toLowerCase())} dismissible={true}  onClose={props.onClick}>
            <p>{props.description}</p>
          </Alert>
          </div>
        ): null;

}

