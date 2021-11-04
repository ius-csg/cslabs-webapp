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

  useEffect(() => {// when component mounts this is called.
    // Finds current messages that are not contained in the local storage
    setCurrentMessage(systemMessageList.find(message => !dismissedMessage.includes(message.id.toString())));

    // Check dismissed message state if contains items before overwriting the local item storage with the it.
    if (dismissedMessage.length > 0) {
      window.localStorage.setItem('dismissedMessage', dismissedMessage.join());
    }
  }, [dismissedMessage]);

  useMount(async () => {// called when page is rendered
    // Gets the system messages list from the backend
    const messages = await getSystemMessages();
    setSystemMessageList(messages);

    // Checks if there are dismissed IDs in local storage, and if so set the
    // component states appropriately so that those messages don't render.
    const localStorageItem = window.localStorage.getItem('dismissedMessage');
    if (localStorageItem) {
      const localStorageArray = localStorageItem.split(',');
      setDismissedMessage(localStorageArray);
      setCurrentMessage(messages.find(message => !localStorageArray.includes(message.id.toString())));
    }
    else {
      // If nothing in local storage render the first message
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
