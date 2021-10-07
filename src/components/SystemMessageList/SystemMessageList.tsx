import React, {useState} from 'react';
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
     return (
      <div>
        {systemMessageList[count] ? <SystemMessageNotification onClick={() => setCount(count + 1)} type={systemMessageList[count].type} description={systemMessageList[count].description} />
          : null}
      </div>
    );

};

export default SystemMessagesList;
