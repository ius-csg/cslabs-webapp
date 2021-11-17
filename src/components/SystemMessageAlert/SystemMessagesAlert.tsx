import React, {useState} from 'react';
import {Alert} from 'react-bootstrap';
import styles from './SystemMessageAlert.module.scss';
import {SystemMessage, SystemMessageType} from '../../types/SystemMessage';
import {classes} from '../../util';


export function getAlertTypeClass(type: SystemMessageType) {
  if (type === 'Info') {
    return styles['info'];
  } else if (type === 'Warning') {
    return styles['warning'];
  } else
    return styles['notice'];
}

interface Props {
  onClick?: () => void;
  message: SystemMessage;
}

export function SystemMessagesAlert(props: Props) {
  const [show] = useState(true);
  return show ? (
    <div>
      <Alert
        className={classes(styles['base-alert'], getAlertTypeClass(props.message.type))}
        dismissible={true}
        onClose={props.onClick}
      >
        <p>{props.message.description}</p>
      </Alert>
    </div>
  ) : null;
}

