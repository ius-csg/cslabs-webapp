import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './AlertNotification.module.scss';


export type AlertNotificationTypes = 'info' | 'warning' | 'notice';

interface Props {
  type: AlertNotificationTypes;
}

export function AlertNotification ({type}: Props) {

    const [show, setShow] = useState(true);

        return show ? (
          <div className='containsBanner'>
          <div className='banner'>
             <Alert className={styles[type]} dismissible={true}  onClose={() => setShow(false)}>
            <p>CSLabs will be unavailable until August 24th, 2021 for maintenance.
            </p>
          </Alert>
          </div>
          </div>
        ): null;

}

