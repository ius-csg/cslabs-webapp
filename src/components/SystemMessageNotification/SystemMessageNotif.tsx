import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './SystemMessageNotification.module.scss';
import {SystemMessageNotification} from '../../types/SystemMessageNotification';


export function getAlertTypeClass(type: SystemMessageNotification) {
  if (type === 'Info') {
    return styles['info'];
  }
  else if (type === 'Warning') {
  return styles['warning'];
  }
  else
    return styles['notice'];

}

interface Props {
  onClick?: () => void;
  id: number;
  type: SystemMessageNotification;

  description: string;
}

export function SystemMessageNotif (props: Props) {

    const [show] = useState(true);

          return show ? (
          <div>
             <Alert className={`${styles['base-alert']} ${getAlertTypeClass(props.type)}`} dismissible={true} onClose={props.onClick}>
            <p>{props.description}</p>
          </Alert>
          </div>
        ): null;

}

