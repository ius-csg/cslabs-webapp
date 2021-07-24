import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './Alert.module.scss';

interface Props {
  type: string;
}

export function Alerts ({type}: Props) {

    const [show, setShow] = useState(true);

  if (type.match(`warning`)) {
    type = 'warning';

  }
  else if (type.match(`info`)) {
    type = 'info';
  }
  else
    type = 'notice';


    if (show) {
        return (
          <div className='d-inline text-center'>
             <Alert className={styles[type]} dismissible={true}  onClose={() => setShow(false)}>
            <Alert.Heading>CSLabs will be unavailable until August 24th, 2021 for maintenance.
            </Alert.Heading>
          </Alert>
          </div>
        );
    }
  else {
    return null;
    }

}

