import {SystemMessageNotification} from './SystemMessageNotification';

export interface SystemMessage {
  id: number;
  type: SystemMessageNotification;
  description: string;

}
