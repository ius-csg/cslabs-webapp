import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './AlertNotification.module.scss';


export type AlertNotificationTypes = 'info' | 'warning' | 'notice';

interface Props {
  onClick?: () => void;
  type: AlertNotificationTypes;
  description: string;
}

export function AlertNotification (alertInfo: Props) {

    const [show, setShow] = useState(true);

        return show ? (
          <div className={styles['alert-container']}>
             <Alert className={styles[alertInfo.type]} dismissible={true}  onClose={() => setShow(false)}>
            <p>{alertInfo.description}</p>
          </Alert>
          </div>
        ): null;

}

