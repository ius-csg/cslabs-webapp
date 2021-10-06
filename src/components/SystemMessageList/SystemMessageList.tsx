import React, {useState} from 'react';
import {SystemMessageNotification, SystemMessageNotificationTypes} from '../SystemMessageNotification/SystemMessageNotification';
import {getSystemMessages} from '../../api';
import {useMount} from '../../hooks/useMount';


export interface SystemMessageListProp {
  type: SystemMessageNotificationTypes;
  description: string;

}

const SystemMessageList  = () => {

  const [BL, setBL] = useState<SystemMessageListProp[]>([]);

  const [count, setCount] = useState(0);

  useMount(async () => {
    try {
      const messages = await getSystemMessages();
      setBL(messages);
    }
    catch (e) {
     console.log('error');
    }

  });
     return (
      <div>
        {BL[count] ? <SystemMessageNotification onClick={() => setCount(count + 1)} type={BL[count].type} description={BL[count].description} />
          : null}
      </div>
    );

};

export default SystemMessageList;
