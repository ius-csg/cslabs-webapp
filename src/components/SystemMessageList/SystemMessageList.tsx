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
    setCurrentMessage(systemMessageList.find(message => !dismissedMessage.includes(message.id.toString())));
    window.localStorage.setItem('dismissedMessage', dismissedMessage.join());
  }, [dismissedMessage]);

  useEffect(() => {
    // tslint:disable:no-console
    // console.log(systemMessageList);
    // console.log(dismissedMessage);
    // console.log(currentMessage);
  });

  useMount(async () => {
    const messages = await getSystemMessages();
    setSystemMessageList(messages);
    const localStorageItem = window.localStorage.getItem('dismissedMessage');
    if (localStorageItem) {
      const localStorageArray = localStorageItem.split(',');
      setDismissedMessage(localStorageArray);
      setCurrentMessage(messages.find(message => !localStorageArray.includes(message.id.toString())));
    }
    else {
      setCurrentMessage(messages[0]);
    }
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
