import React, {useState} from 'react';
import {SystemMessageNotification, SystemMessageNotificationTypes} from '../SystemMessageNotification/SystemMessageNotification';


interface SystemMessageListProp {
  type: SystemMessageNotificationTypes;
  description: string;

}

const SystemMessageList  = () => {

  const BL: SystemMessageListProp[] = [
    { type: 'warning', description: 'Test1'},
    { type: 'info', description: 'Test2'},
    { type: 'notice', description: 'Test3'}
  ];

  const [count, setCount] = useState(0);

  return (
    <div>
      {BL[count] ? <SystemMessageNotification onClick={() => setCount(count + 1)} type={BL[count].type} description={BL[count].description} />
        : null}
    </div>
  );
};

export default SystemMessageList;
