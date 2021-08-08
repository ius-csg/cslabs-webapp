import React from 'react';
import {AlertNotificationTypes} from '../Alert/AlertNotification';


interface BannerListProp {
  type: AlertNotificationTypes;
  description: string;

}

const BL: BannerListProp[] = [
  { type: 'warning', description: 'Test1'},
  { type: 'info', description: 'Test2'},
  { type: 'notice', description: 'Test3'}
];




// export const BannerList: React.FC<BannerListProp> = ({type, description}) =>
//  return
