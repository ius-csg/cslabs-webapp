import {SystemMessageNotificationTypes} from '../components/SystemMessageNotification/SystemMessageNotification';

export interface SystemMessage {
  id: number;
  type: SystemMessageNotificationTypes;
  description: string;

}
