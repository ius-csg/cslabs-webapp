import {Lab} from './Lab';
import {UserLabVm} from './UserLabVm';

export interface UserLab {
  id: number;
  lab: Lab;
  userLabVms: UserLabVm[];
  hasTopology: boolean;
  hasReadme: boolean;

  labTime: string;
  status: string;

  status: 'Started' | 'NotStarted' | 'Completed';

}

export type InitializationStatus = 'Initialized' | 'Initializing';
