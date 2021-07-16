import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './Alert.module.scss';

export const Alerts = () => {

    const [show, setShow] = useState(true);

    if (show) {
        return (
          <div className='d-inline text-center'>
             <Alert className={styles['Alert']} dismissible={true}  onClose={() => setShow(false)}>
            <Alert.Heading>CSLabs will be unavailable until August 24th, 2021 for maintenance.
            </Alert.Heading>
          </Alert>
          </div>
        );
    }
  else {
    return null;
    }

};

