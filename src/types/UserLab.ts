import {Lab} from './Lab';
import {UserLabVm} from './UserLabVm';
import {Entity} from './Entity';

export interface UserLab extends Entity {
  lab: Lab;
  userLabVms: UserLabVm[];
  hasTopology: boolean;
  hasReadme: boolean;
  endDateTime?: string;
  status: UserLabStatus;
  userModuleId: number;
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
