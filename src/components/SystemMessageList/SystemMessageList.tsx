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
  const [currentMessage, setCurrentMessage] = useState<SystemMessageList>();

  useEffect(() => {
    setCurrentMessage(systemMessageList.find((message: SystemMessageList) => !dismissedMessage.includes(message.id.toString())));
    window.sessionStorage.setItem('dismissedMessage', dismissedMessage.join());
  }, [dismissedMessage]);

  useMount(async () => {
    const messages = await getSystemMessages();
    setSystemMessageList(messages);
    const verifySessionID = window.localStorage.getItem ? ('dismissedMessage').split(',') : null;
    if (verifySessionID) {
      setDismissedMessage(verifySessionID);
    }
    setCurrentMessage(systemMessageList.find((message2: SystemMessageList) => !verifySessionID ?.includes(message2.id.toString()), null));
  });

  return (
    <div>
      {currentMessage ? <SystemMessageNotification
        key={currentMessage.id}
        onClick={() => setDismissedMessage([...dismissedMessage, currentMessage.id.toString()])}
        id={currentMessage.id}
        type={currentMessage.type}
        description={currentMessage.description}
      /> : null}
    </div>
  );
};
export default SystemMessagesList;
