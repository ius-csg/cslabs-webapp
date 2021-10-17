import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './SystemMessageNotification.module.scss';


export function getAlertTypeClass(type: SystemMessageNotificationTypes) {
  const newtype = type.toLowerCase();

  if (newtype === 'info') {
    return styles['info'];
  }
  else if (newtype === 'warning') {
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
          <div>
             <Alert className={styles['base-alert'] + ' ' + getAlertTypeClass(props.type)} dismissible={true}  onClose={props.onClick}>
            <p>{props.description}</p>
          </Alert>
          </div>
        ): null;

}

