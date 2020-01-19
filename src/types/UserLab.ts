import {Lab} from './Lab';
import {UserLabVm} from './UserLabVm';

export interface UserLab {
  id: number;
  lab: Lab;
  userLabVms: UserLabVm[];
  hasTopology: boolean;
  hasReadme: boolean;
}
