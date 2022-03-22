import { useEffect, useState } from 'react';
import {SystemMessageAlert} from '../SystemMessageAlert/SystemMessageAlert';
import {getSystemMessages} from '../../api';
import {useMount} from '../../hooks/useMount';
import {SystemMessage} from '../../types/SystemMessage';

const SystemMessageList = () => {

  const [systemMessageList, setSystemMessageList] = useState<SystemMessage[]>([]);
  const [dismissedMessage, setDismissedMessage] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<SystemMessage>();

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
      {currentMessage ? <SystemMessageAlert
        key={currentMessage.id}
        message={currentMessage}
        onClick={() => setDismissedMessage([...dismissedMessage, currentMessage.id.toString()])}
      /> : null}
    </div>
  );
};
export default SystemMessageList;
