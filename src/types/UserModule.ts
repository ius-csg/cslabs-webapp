import {Module} from './Module';
import {UserLab} from './UserLab';

export interface UserModule {
  id: number;
  module: Module;
  userLabs: UserLab[];
}

export function isOpen(status: string) {
  return status === 'Open';
}
export function isCompleted(status: string) {
  return status === 'Completed';
}
