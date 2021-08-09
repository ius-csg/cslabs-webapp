import React from 'react';
import {AlertNotification, AlertNotificationTypes} from '../Alert/AlertNotification';

interface BannerListProp {
  type: AlertNotificationTypes;
  description: string;

}

const BannerList  = () => {

  const BL: BannerListProp[] = [
    { type: 'warning', description: 'Test1'},
    { type: 'info', description: 'Test2'},
    { type: 'notice', description: 'Test3'}
  ];

  return (
    <div>
      {BL.map((b, index) =>
        <AlertNotification key={index} type={b.type} description={b.description}/>
      )}
    </div>
  );
};

export default BannerList;




// export const BannerList: React.FC<BannerListProp> = ({type, description}) =>
//  return
