import React, {useEffect, useState} from 'react';
import {SystemMessageNotification, SystemMessageNotificationTypes} from '../SystemMessageNotification/SystemMessageNotification';
import {getSystemMessages} from '../../api';
import {useMount} from '../../hooks/useMount';


export interface SystemMessageList {
  type: SystemMessageNotificationTypes;
  description: string;

}

const SystemMessagesList  = () => {

  const [systemMessageList, setSystemMessageList] = useState<SystemMessageList[]>([]);

  const [count, setCount] = useState(0);

  useMount(async () => {
      const messages = await getSystemMessages();
      setSystemMessageList(messages);

  });

  // reference https://blog.bitsrc.io/5-methods-to-persisting-state-between-page-reloads-in-react-8fc9abd3fa2f
  useEffect(()=> {
    setCount(JSON.parse(window.localStorage.getItem('count') as string));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('count', String(count));
  }, ['count']);


     return (
      <div>
        {systemMessageList[count] ? <SystemMessageNotification onClick={() => setCount(count + 1)} type={systemMessageList[count].type} description={systemMessageList[count].description} />
          : null}
      </div>
    );

};

export default SystemMessagesList;
