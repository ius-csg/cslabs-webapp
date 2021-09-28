import React, {useState} from 'react';
import {SystemMessageNotification, SystemMessageNotificationTypes} from '../SystemMessageNotification/SystemMessageNotification';
import {getSystemMessages} from '../../api';


export interface SystemMessageListProp {
  type: SystemMessageNotificationTypes;
  description: string;

}

const SystemMessageList  = () => {

  const BL: Promise<SystemMessageListProp> = getSystemMessages();
 // const message: SystemMessageListProp = getSystemMessage();

  const [count, setCount] = useState(0);

  return (
    <div>
      {BL[count] ? <SystemMessageNotification onClick={() => setCount(count + 1)} type={BL[count].type} description={BL[count].description} />
        : null}
    </div>
  );
};

export default SystemMessageList;
