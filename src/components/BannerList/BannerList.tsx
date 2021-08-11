import React, {useState} from 'react';
import {AlertNotification, AlertNotificationTypes} from '../Alert/AlertNotification';

interface BannerListProp {
  type: AlertNotificationTypes;
  description: string;

}

function BannerList (prop: BannerListProp) {
  const [count, setCount] = useState(0);

  const BL: BannerListProp[] = [
    {type: 'warning', description: 'Test1'},
    {type: 'info', description: 'Test2'},
    {type: 'notice', description: 'Test3'}
  ];

  return (
    <div>
      {BL[0] ? <AlertNotification onClick={() => setCount(count + 1)}  description={prop.description} type={prop.type}/>
        : null}
    </div>
  );
};

export default BannerList;
