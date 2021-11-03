import React, {useEffect, useState} from 'react';
import {SystemMessageNotification, SystemMessageNotificationTypes} from '../SystemMessageNotification/SystemMessageNotification';
import {getSystemMessages} from '../../api';
import {useMount} from '../../hooks/useMount';


export interface SystemMessageList {
  id: number;
  type: SystemMessageNotificationTypes;
  description: string;

}

const SystemMessagesList = () => {

  const [systemMessageList, setSystemMessageList] = useState<SystemMessageList[]>([]);

  const [dismissedMessage, setDismissedMessage] = useState<string[]>([]);

  useEffect(() => {
    window.localStorage.setItem('dismissedMessage', dismissedMessage.join(','));
  }, ['dismissedMessage']);

  useMount(async () => {
    const messages = await getSystemMessages();
    setSystemMessageList(messages);
    const verifySessionID = window.localStorage.getItem ? ('dismissedMessage').split(',') : null;
    if (verifySessionID) {
      setDismissedMessage(verifySessionID);
    }
  });

  return (
    <div>
      {systemMessageList.map((message: SystemMessageList) => {
        if (!dismissedMessage.includes(message.id.toString())) {
          return (
          <SystemMessageNotification
            key={message.id}
            onClick={() => setDismissedMessage([...dismissedMessage, message.id.toString()])}
            id={message.id}
            type={message.type}
            description={message.description}
          />
          );
        }
        else {
          return null;
        }
      })}
    </div>
  );
};
export default SystemMessagesList;
