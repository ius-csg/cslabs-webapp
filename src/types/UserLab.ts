import {Lab} from './Lab';
import {UserLabVm} from './UserLabVm';

export interface UserLab {
  id: number;
  lab: Lab;
  userLabVms: UserLabVm[];
  hasTopology: boolean;
  hasReadme: boolean;
  endDateTime?: string;
  status: UserLabStatus;
}

export type UserLabStatus = 'Started' | 'NotStarted' | 'Completed';

export type InitializationStatus = 'Initialized' | 'Initializing';

export function getUserLabStatusLabel(status: UserLabStatus) {
  switch (status) {
    case 'Completed': return 'Completed';
    case 'NotStarted': return 'Not Started';
    case 'Started': return 'In Progress';
  }
}
