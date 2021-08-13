import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './AlertNotification.module.scss';


export type AlertNotificationTypes = 'info' | 'warning' | 'notice';

interface Props {
  onClick?: () => void;
  type: AlertNotificationTypes;
  description: string;
}

export function AlertNotification (props: Props) {

    const [show] = useState(true);

        return show ? (
          <div className={styles['alert-container']}>
             <Alert className={styles[props.type]} dismissible={true}  onClose={props.onClick}>
            <p>{props.description}</p>
          </Alert>
          </div>
        ): null;

}

