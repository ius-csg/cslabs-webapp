import {SystemMessageAlert} from './SystemMessageAlert';

export interface SystemMessage {
  onClick?: () => void;
  id: number;
  type: SystemMessageAlert;
  description: string;

}
