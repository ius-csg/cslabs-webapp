import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './SystemMessageAlert.module.scss';
import {SystemMessageAlert} from '../../types/SystemMessageAlert';
import {SystemMessage} from '../../types/SystemMessage';


export function getAlertTypeClass(type: SystemMessageAlert) {
  if (type === 'Info') {
    return styles['info'];
  }
  else if (type === 'Warning') {
  return styles['warning'];
  }
  else
    return styles['notice'];

}

export function SystemMessagesAlert (props: SystemMessage) {

    const [show] = useState(true);

          return show ? (
          <div>
             <Alert className={`${styles['base-alert']} ${getAlertTypeClass(props.type)}`} dismissible={true} onClose={props.onClick}>
            <p>{props.description}</p>
          </Alert>
          </div>
        ): null;

}

