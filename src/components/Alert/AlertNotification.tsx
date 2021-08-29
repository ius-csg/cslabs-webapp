import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './AlertNotification.module.scss';


type AlertNotificationTypes = 'info' | 'warning' | 'notice';

interface Props {
  type: AlertNotificationTypes;
}

export function AlertNotification ({type}: Props) {

    const [show, setShow] = useState(true);

        return show ? (
          <div className='d-inline text-center'>
             <Alert className={styles[type]} dismissible={true}  onClose={() => setShow(false)}>
            <Alert.Heading>CSLabs will be unavailable until August 24th, 2021 for maintenance.
            </Alert.Heading>
          </Alert>
          </div>
        ): null;

}

