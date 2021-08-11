import React, {useState} from 'react';
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


  const [count, setCount] = useState(0);

  return (
    <div>
      {BL[count] ? <AlertNotification onClick={() => setCount(count + 1)} type={BL[count].type} description={BL[count].description} />
        : null}
    </div>
  );
};

export default BannerList;




// export const BannerList: React.FC<BannerListProp> = ({type, description}) =>
//  return
