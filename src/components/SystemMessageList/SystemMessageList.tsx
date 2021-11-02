import React, {useState} from 'react';
import {SystemMessageNotification, SystemMessageNotificationTypes} from '../SystemMessageNotification/SystemMessageNotification';
import {getSystemMessages} from '../../api';
import {useMount} from '../../hooks/useMount';


export interface SystemMessageList {
  id: number;
  type: SystemMessageNotificationTypes;
  description: string;

}

// Create function for getting and processing id to local storage

const SystemMessagesList  = () => {

  const [systemMessageList, setSystemMessageList] = useState<SystemMessageList[]>([]);

  const [count, setCount] = useState( 0);

  useMount(async () => {
      const messages = await getSystemMessages();
      setSystemMessageList(messages);

  });

     return (
      <div>
        {systemMessageList[count] ? <SystemMessageNotification onClick={() => setCount(count+1)} id={systemMessageList[count].id} type={systemMessageList[count].type} description={systemMessageList[count].description} />
          : null}
      </div>
    );

};

export default SystemMessagesList;
