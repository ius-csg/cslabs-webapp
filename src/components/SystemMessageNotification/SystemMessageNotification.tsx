import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './SystemMessageNotification.module.scss';


/*export function getSystemMessageType(type: Props) {
  if (type.type === 'info') {
    return 'info';
  }
  else if (type.type === 'warning') {
  return 'warning';
  }
  else
    return 'notice';

}*/

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
             <Alert className={styles[props.type.toLowerCase()]} dismissible={true}  onClose={props.onClick}>
            <p>{props.description}</p>
          </Alert>
          </div>
        ): null;

}

